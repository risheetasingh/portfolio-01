import { useRef, useEffect } from 'react'

// Characters ordered by visual density: lots of spaces for dead zone,
// then sparse → dense characters
const DEFAULT_CHARS = '          .,:;-~=+xXzZ{}cCvVnN@#'

interface Props {
  src: string
  characters?: string
  fgColor?: string
  bgColor?: string
  highlightColor?: string
  highlightRadius?: number
  parallaxIntensity?: number
  cellSize?: number
  className?: string
}

export default function AsciiArt({
  src,
  characters = DEFAULT_CHARS,
  fgColor = '#E60023',
  bgColor = '#0a0a0a',
  highlightColor = '#ff6b4a',
  highlightRadius = 150,
  parallaxIntensity = 8,
  cellSize = 12,
  className,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef({
    grid: null as { char: string; depth: number }[][] | null,
    cols: 0,
    rows: 0,
    mouse: { x: -9999, y: -9999 },
    smoothMouse: { x: -9999, y: -9999 },
    mounted: true,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const state = stateRef.current
    state.mounted = true
    let rafId = 0

    const img = new Image()
    img.onload = () => {
      if (!state.mounted) return

      const cellW = Math.round(cellSize * 0.6)
      const cellH = cellSize

      // Calculate grid from canvas display size
      const build = () => {
        const displayW = canvas.offsetWidth
        const displayH = canvas.offsetHeight
        if (!displayW || !displayH) return

        const dpr = window.devicePixelRatio || 1
        canvas.width = displayW * dpr
        canvas.height = displayH * dpr
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

        const cols = Math.floor(displayW / cellW)
        const rows = Math.floor(displayH / cellH)
        state.cols = cols
        state.rows = rows

        // Sample image brightness at grid resolution
        const sample = new OffscreenCanvas(cols, rows)
        const sCtx = sample.getContext('2d')!
        sCtx.drawImage(img, 0, 0, cols, rows)
        const data = sCtx.getImageData(0, 0, cols, rows).data

        const grid: { char: string; depth: number }[][] = []
        for (let y = 0; y < rows; y++) {
          const row: { char: string; depth: number }[] = []
          for (let x = 0; x < cols; x++) {
            const i = (y * cols + x) * 4
            const rawBrightness = (data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114) / 255
            // Hard threshold: kill antialiasing noise at edges
            const clean = rawBrightness < 0.08 ? 0 : rawBrightness
            // Gamma correction: boost mid-tones for solid fill
            const brightness = Math.pow(clean, 0.4)
            const charIdx = Math.floor(brightness * (characters.length - 1))
            const char = characters[charIdx]
            row.push({ char, depth: 1 - brightness })
          }
          grid.push(row)
        }
        state.grid = grid
      }

      build()
      const ro = new ResizeObserver(build)
      ro.observe(canvas)

      // Parse hex to RGB
      const parseHex = (hex: string) => {
        const h = hex.replace('#', '')
        return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
      }
      const baseRgb = parseHex(fgColor)
      const hlRgb = parseHex(highlightColor)

      // Render loop
      const render = () => {
        if (!state.mounted) return
        rafId = requestAnimationFrame(render)

        const { grid, cols, rows, mouse, smoothMouse } = state
        if (!grid) return

        const displayW = canvas.offsetWidth
        const displayH = canvas.offsetHeight
        if (!displayW || !displayH) return

        // Smooth mouse lerp
        smoothMouse.x += (mouse.x - smoothMouse.x) * 0.06
        smoothMouse.y += (mouse.y - smoothMouse.y) * 0.06

        const scaleX = displayW / (cellW * cols)
        const scaleY = displayH / (cellH * rows)
        const fontSize = cellH * scaleY

        // Clear with background
        ctx.fillStyle = bgColor
        ctx.fillRect(0, 0, displayW, displayH)
        ctx.font = `${fontSize}px var(--mono), 'JetBrains Mono', monospace`
        ctx.textBaseline = 'top'

        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const cell = grid[y][x]
            if (cell.char === ' ') continue

            const bx = x * cellW * scaleX
            const by = y * cellH * scaleY

            // Spotlight: dim by default, brightens near cursor
            const distX = smoothMouse.x - bx
            const distY = smoothMouse.y - by
            const dist = Math.sqrt(distX * distX + distY * distY)
            const dimOpacity = 0.3

            if (dist < highlightRadius) {
              const t = 1 - dist / highlightRadius
              const opacity = dimOpacity + (1 - dimOpacity) * t
              const r = Math.round(baseRgb[0] + (hlRgb[0] - baseRgb[0]) * t)
              const g = Math.round(baseRgb[1] + (hlRgb[1] - baseRgb[1]) * t)
              const b = Math.round(baseRgb[2] + (hlRgb[2] - baseRgb[2]) * t)
              ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`
            } else {
              ctx.fillStyle = `rgba(${baseRgb[0]},${baseRgb[1]},${baseRgb[2]},${dimOpacity})`
            }

            ctx.fillText(cell.char, bx, by)
          }
        }
      }

      rafId = requestAnimationFrame(render)
      return () => ro.disconnect()
    }
    img.src = src

    return () => {
      state.mounted = false
      cancelAnimationFrame(rafId)
    }
  }, [src, characters, fgColor, bgColor, highlightColor, highlightRadius, parallaxIntensity, cellSize])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    // Listen on the parent container so events work even when content is layered on top
    const parent = canvas.parentElement
    if (!parent) return

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      stateRef.current.mouse.x = e.clientX - rect.left
      stateRef.current.mouse.y = e.clientY - rect.top
    }
    const onLeave = () => {
      stateRef.current.mouse.x = -9999
      stateRef.current.mouse.y = -9999
    }

    parent.addEventListener('mousemove', onMove)
    parent.addEventListener('mouseleave', onLeave)
    return () => {
      parent.removeEventListener('mousemove', onMove)
      parent.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  )
}
