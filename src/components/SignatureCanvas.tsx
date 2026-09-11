import { useEffect, useRef } from 'react'
import { signaturePath, signatureViewBox } from '../data/signature'

interface Point { x: number; y: number }
// A stroke is a sequence of points that should be drawn connected.
// `lift` = true means: don't draw a line from the previous stroke into this
// one (it's a hole/counter inside a letter, not a natural continuation).
interface Stroke { points: Point[]; lift: boolean }

const DRAW_DURATION_MS = 2400
const START_DELAY_MS = 300
const STROKE_COLOR = '#e60023'
const STRAND_COUNT = 2
const STRAND_SPACING = 1.3
const STRAND_WIDTH = 1.4
const SAMPLES_PER_100_UNITS = 18
const LEAD_SAMPLES = 40

// Splits the traced glyph path into its separate subpaths (one per closed
// contour — most letters are one, but letters with a counter like "R", "e",
// "a" are two: the outer letter shape and the inner hole). Each subpath is
// sampled into an evenly-spaced polyline using a hidden SVG path element as
// a geometry helper only — nothing here is rendered as SVG.
function sampleSubpaths(): Point[][] {
  const svgNS = 'http://www.w3.org/2000/svg'
  const svg = document.createElementNS(svgNS, 'svg')
  svg.style.position = 'absolute'
  svg.style.width = '0'
  svg.style.height = '0'
  svg.style.opacity = '0'
  svg.style.pointerEvents = 'none'
  document.body.appendChild(svg)

  const subpathStrings = signaturePath.split(/(?=M)/g).filter(s => s.trim())
  const subpaths: Point[][] = []

  for (const d of subpathStrings) {
    const path = document.createElementNS(svgNS, 'path')
    path.setAttribute('d', d)
    svg.appendChild(path)
    const total = path.getTotalLength()
    const samples = Math.max(6, Math.round((total / 100) * SAMPLES_PER_100_UNITS))
    const points: Point[] = []
    for (let i = 0; i <= samples; i++) {
      const p = path.getPointAtLength((i / samples) * total)
      points.push({ x: p.x, y: p.y })
    }
    subpaths.push(points)
  }

  document.body.removeChild(svg)
  return subpaths
}

function boundingBox(points: Point[]) {
  const xs = points.map(p => p.x)
  const ys = points.map(p => p.y)
  return { minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys) }
}

function isNested(inner: ReturnType<typeof boundingBox>, outer: ReturnType<typeof boundingBox>) {
  return inner.minX >= outer.minX - 1 && inner.maxX <= outer.maxX + 1 &&
    inner.minY >= outer.minY - 1 && inner.maxY <= outer.maxY + 1
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

// Builds the ordered list of strokes: lead-in line, each letter subpath
// (holes flagged to lift the pen instead of connecting), lead-out line.
function buildStrokes(cssWidth: number, cssHeight: number): Stroke[] {
  const [vbX, vbY, vbW, vbH] = signatureViewBox.split(' ').map(Number)
  const glyphPixelWidth = Math.min(400, cssWidth * 0.65)
  const scale = glyphPixelWidth / vbW
  const glyphOffsetX = (cssWidth - glyphPixelWidth) / 2
  const midY = vbY + vbH / 2

  const toCanvasSpace = (p: Point): Point => ({
    x: glyphOffsetX + (p.x - vbX) * scale,
    y: cssHeight / 2 + (p.y - midY) * scale,
  })

  const rawSubpaths = sampleSubpaths()
  const canvasSubpaths = rawSubpaths.map(pts => pts.map(toCanvasSpace))
  const boxes = rawSubpaths.map(boundingBox)

  const strokes: Stroke[] = canvasSubpaths.map((points, i) => {
    // A subpath lifts the pen (no connecting line drawn into it) if it's
    // nested inside ANY earlier subpath's bounding box — that covers both
    // true holes (a loop crossing over itself, e.g. the R's bowl) and
    // genuinely separate pen-lifted marks (the dot on the "i") which sit
    // inside the overall signature's bounding box but were never connected.
    const lift = i > 0 && boxes.slice(0, i).some(b => isNested(boxes[i], b))
    return { points, lift }
  })

  const firstPoint = strokes[0].points[0]
  const lastStroke = strokes[strokes.length - 1]
  const lastPoint = lastStroke.points[lastStroke.points.length - 1]

  const leadIn: Stroke = {
    lift: false,
    points: Array.from({ length: LEAD_SAMPLES }, (_, i) => ({
      x: lerp(0, firstPoint.x, i / (LEAD_SAMPLES - 1)),
      y: firstPoint.y,
    })),
  }
  const leadOut: Stroke = {
    lift: false,
    points: Array.from({ length: LEAD_SAMPLES }, (_, i) => ({
      x: lerp(lastPoint.x, cssWidth, i / (LEAD_SAMPLES - 1)),
      y: lastPoint.y,
    })),
  }

  return [leadIn, ...strokes, leadOut]
}

// Flattens strokes into a single list of drawable segments, each segment
// being a run of points drawn with one continuous lineTo (a "lift" starts
// a fresh segment instead of connecting to the previous point).
function flattenToSegments(strokes: Stroke[]): Point[][] {
  const segments: Point[][] = []
  let current: Point[] = []
  for (const stroke of strokes) {
    if (stroke.lift && current.length) {
      segments.push(current)
      current = []
    }
    current = current.concat(stroke.points)
  }
  if (current.length) segments.push(current)
  return segments
}

function totalPointCount(segments: Point[][]) {
  return segments.reduce((sum, seg) => sum + seg.length, 0)
}

export default function SignatureCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const cssWidth = wrap.clientWidth
    const cssHeight = wrap.clientHeight
    canvas.width = cssWidth * dpr
    canvas.height = cssHeight * dpr
    ctx.scale(dpr, dpr)

    const strokes = buildStrokes(cssWidth, cssHeight)
    const segments = flattenToSegments(strokes)
    const total = totalPointCount(segments)

    const strandOffsets = Array.from({ length: STRAND_COUNT }, (_, i) => (i - (STRAND_COUNT - 1) / 2) * STRAND_SPACING)

    const drawSegmentUpTo = (points: Point[], count: number) => {
      if (count < 2) return
      const slice = points.slice(0, count)

      // Perpendicular normal at each point. Uses a wide window for the
      // tangent estimate (not just immediate neighbors), then smooths the
      // resulting normals — immediate-neighbor tangents flip unstably at
      // sharp cusps in cursive strokes, which made the strand bundle
      // visibly jitter up and down instead of flowing smoothly.
      const WINDOW = 6
      const rawNormals: Point[] = slice.map((p, i) => {
        const prev = slice[Math.max(0, i - WINDOW)]
        const next = slice[Math.min(slice.length - 1, i + WINDOW)]
        const dx = next.x - prev.x
        const dy = next.y - prev.y
        const len = Math.hypot(dx, dy) || 1
        return { x: -dy / len, y: dx / len }
      })
      const SMOOTH = 4
      const normals: Point[] = rawNormals.map((_, i) => {
        let sx = 0, sy = 0
        for (let k = Math.max(0, i - SMOOTH); k <= Math.min(rawNormals.length - 1, i + SMOOTH); k++) {
          sx += rawNormals[k].x
          sy += rawNormals[k].y
        }
        const len = Math.hypot(sx, sy) || 1
        return { x: sx / len, y: sy / len }
      })

      for (const offset of strandOffsets) {
        ctx.beginPath()
        ctx.strokeStyle = STROKE_COLOR
        ctx.lineWidth = STRAND_WIDTH
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        slice.forEach((p, i) => {
          const n = normals[i]
          const x = p.x + n.x * offset
          const y = p.y + n.y * offset
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        })
        ctx.stroke()
      }
    }

    let animationFrameId: number
    let startTime: number | null = null

    const draw = (progress: number) => {
      ctx.clearRect(0, 0, cssWidth, cssHeight)
      let remaining = Math.max(2, Math.floor(progress * total))
      for (const seg of segments) {
        if (remaining <= 0) break
        const take = Math.min(seg.length, remaining)
        drawSegmentUpTo(seg, take)
        remaining -= take
      }
    }

    const tick = (now: number) => {
      if (startTime === null) startTime = now
      const elapsed = now - startTime - START_DELAY_MS
      const progress = Math.min(1, Math.max(0, elapsed / DRAW_DURATION_MS))
      draw(progress)
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(tick)
      }
    }

    animationFrameId = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  return (
    <div className="signature-canvas-wrap" ref={wrapRef}>
      <canvas ref={canvasRef} className="signature-canvas" aria-label="Risheeta" />
    </div>
  )
}
