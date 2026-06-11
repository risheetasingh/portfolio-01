import { createContext, useContext } from 'react'
import { MotionValue, useMotionValue, useSpring } from 'framer-motion'

interface CursorContextType {
  rawX: MotionValue<number>
  rawY: MotionValue<number>
  blobX: MotionValue<number>
  blobY: MotionValue<number>
  blobR: MotionValue<number>
}

const CursorContext = createContext<CursorContextType | null>(null)

export function useCursor() {
  const ctx = useContext(CursorContext)
  if (!ctx) throw new Error('useCursor must be used within CursorProvider')
  return ctx
}

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const rawX = useMotionValue(-200)
  const rawY = useMotionValue(-200)
  const blobX = useSpring(rawX, { stiffness: 80, damping: 20, mass: 0.8 })
  const blobY = useSpring(rawY, { stiffness: 80, damping: 20, mass: 0.8 })
  const blobR = useMotionValue(7)

  return (
    <CursorContext.Provider value={{ rawX, rawY, blobX, blobY, blobR }}>
      {children}
    </CursorContext.Provider>
  )
}
