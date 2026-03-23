import { useEffect } from 'react'
import type { StampDescriptor } from './MaskPainter'

// Normalized [0,1] stroke waypoints — same as original playSketch()
const STROKES: [number, number, number, number][] = [
  [0.05, 0.10, 0.42, 0.72],
  [0.50, 0.05, 0.88, 0.60],
  [0.18, 0.52, 0.58, 0.95],
  [0.62, 0.28, 0.98, 0.82],
  [0.00, 0.72, 0.30, 1.00],
  [0.35, 0.18, 0.68, 0.55],
]

const STEP_SIZE  = 0.018  // in UV units (~18px on a 1000px viewport)
const SPEED      = 0.4    // gestural but not too elongated
const INIT_DELAY = 300    // ms before first stroke
const GAP_DELAY  = 60     // ms pause between strokes

interface UseSketchPlaybackOptions {
  onStamp: (stamp: StampDescriptor) => void
  ready: boolean
}

export function useSketchPlayback({ onStamp, ready }: UseSketchPlaybackOptions) {
  useEffect(() => {
    if (!ready) return

    let cancelled = false
    let rafId: number
    let timeoutId: ReturnType<typeof setTimeout>

    const playStrokes = (si: number, pi: number) => {
      if (cancelled || si >= STROKES.length) return

      const [x1, y1, x2, y2] = STROKES[si]
      const dx    = x2 - x1
      const dy    = y2 - y1
      const len   = Math.sqrt(dx * dx + dy * dy)
      const total = Math.ceil(len / STEP_SIZE)
      const vx    = len > 0 ? dx / len : 0
      const vy    = len > 0 ? dy / len : 0

      if (pi <= total) {
        const t = pi / total
        onStamp({ cx: x1 + dx * t, cy: y1 + dy * t, vx, vy, speed: SPEED })
        rafId = requestAnimationFrame(() => playStrokes(si, pi + 1))
      } else {
        // Pause between strokes, then advance to next
        timeoutId = setTimeout(() => {
          rafId = requestAnimationFrame(() => playStrokes(si + 1, 0))
        }, GAP_DELAY)
      }
    }

    timeoutId = setTimeout(() => {
      rafId = requestAnimationFrame(() => playStrokes(0, 0))
    }, INIT_DELAY)

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      clearTimeout(timeoutId)
    }
  }, [ready, onStamp])
}
