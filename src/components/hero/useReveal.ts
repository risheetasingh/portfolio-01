import { useRef, useCallback } from 'react'
import type { StampDescriptor } from './MaskPainter'

interface UseRevealOptions {
  onStamp: (stamp: StampDescriptor) => void
  sectionRef: React.RefObject<HTMLElement | null>
}

export function useReveal({ onStamp, sectionRef }: UseRevealOptions) {
  const lastPosRef  = useRef<{ x: number; y: number } | null>(null)
  const lastTimeRef = useRef<number>(0)

  const addStamps = useCallback(
    (clientX: number, clientY: number) => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()

      const x = (clientX - rect.left) / rect.width   // [0,1]
      const y = (clientY - rect.top)  / rect.height  // [0,1]

      const now  = performance.now()
      const last = lastPosRef.current

      if (last) {
        const dx    = x - last.x
        const dy    = y - last.y
        const dist  = Math.sqrt(dx * dx + dy * dy)
        const dt    = Math.max(1, now - lastTimeRef.current)

        // True screen-space pixel distance, correcting for non-square viewports.
        // Old formula (dist * max(w,h)) inflated vertical moves by up to 1.78×.
        const pxDist   = Math.sqrt((dx * rect.width) ** 2 + (dy * rect.height) ** 2)
        const speed    = Math.min(pxDist / dt / 12.5, 1.0)

        const steps    = Math.max(1, Math.ceil(dist / (16 / Math.max(rect.width, rect.height))))
        const len      = Math.sqrt(dx * dx + dy * dy)
        const vx       = len > 0 ? dx / len : 0
        const vy       = len > 0 ? dy / len : 0

        for (let i = 0; i <= steps; i++) {
          const t = i / steps
          onStamp({
            cx: last.x + dx * t,
            cy: last.y + dy * t,
            vx,
            vy,
            speed,
          })
        }
      } else {
        onStamp({ cx: x, cy: y, vx: 0, vy: 0, speed: 0 })
      }

      lastPosRef.current  = { x, y }
      lastTimeRef.current = now
    },
    [onStamp, sectionRef]
  )

  const reset = useCallback(() => {
    lastPosRef.current = null
  }, [])

  return { addStamps, reset }
}
