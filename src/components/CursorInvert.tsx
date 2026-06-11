import { useEffect, useRef } from 'react'
import { useCursor } from '../context/CursorContext'

interface Props {
  children: React.ReactNode
  className?: string
}

export default function CursorInvert({ children, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cloneRef = useRef<HTMLDivElement>(null)
  const { blobX, blobY, blobR } = useCursor()

  useEffect(() => {
    const update = () => {
      const el = containerRef.current
      const clone = cloneRef.current
      if (!el || !clone) return
      const rect = el.getBoundingClientRect()
      const cx = blobX.get() - rect.left
      const cy = blobY.get() - rect.top
      const r = blobR.get()
      clone.style.clipPath = `circle(${r}px at ${cx}px ${cy}px)`
    }

    const unsubX = blobX.on('change', update)
    const unsubY = blobY.on('change', update)
    const unsubR = blobR.on('change', update)

    return () => {
      unsubX()
      unsubY()
      unsubR()
    }
  }, [blobX, blobY, blobR])

  return (
    <div ref={containerRef} className={`cursor-invert-wrap${className ? ` ${className}` : ''}`}>
      {children}
      <div ref={cloneRef} className="cursor-invert-clone" aria-hidden="true">
        {children}
      </div>
    </div>
  )
}
