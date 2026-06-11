import { useEffect, useState } from 'react'
import { motion, animate, useTransform } from 'framer-motion'
import { useCursor } from '../context/CursorContext'

type CursorState = 'default' | 'hover' | 'expand'

export default function Cursor() {
  const [state, setState] = useState<CursorState>('default')
  const [visible, setVisible] = useState(false)
  const { rawX, rawY, blobX, blobY, blobR } = useCursor()

  // Animate blobR when state changes
  useEffect(() => {
    const target = state === 'expand' ? 7 : state === 'hover' ? 24 : 7
    animate(blobR, target, { duration: 0.45, ease: [0.16, 1, 0.3, 1] })
  }, [state, blobR])

  useEffect(() => {
    const TEXT_SELECTORS = 'h1, h2, h3, .work-item-title, .about-heading'

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      if (!visible) setVisible(true)

      const t = e.target as Element
      if (t.closest(TEXT_SELECTORS)) {
        setState('expand')
      } else if (t.closest('a, button, [role="button"], .linked')) {
        setState('hover')
      } else {
        setState('default')
      }
    }

    window.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', () => {
      setVisible(false)
      setState('default')
    })
    document.documentElement.addEventListener('mouseenter', () => setVisible(true))

    return () => window.removeEventListener('mousemove', onMove)
  }, [visible, rawX, rawY])

  const diameter = useTransform(blobR, r => r * 2)

  return (
    <motion.div
      className="cursor-blob"
      style={{
        x: blobX,
        y: blobY,
        translateX: '-50%',
        translateY: '-50%',
        width: diameter,
        height: diameter,
      }}
      animate={{ opacity: visible ? (state === 'expand' ? 0.92 : 1) : 0 }}
      transition={{ opacity: { duration: 0.2 } }}
    />
  )
}
