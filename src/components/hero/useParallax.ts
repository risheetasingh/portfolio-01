import { useMotionValue } from 'framer-motion'

export function useParallax() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const update = (nx: number, ny: number) => {
    mouseX.set(nx)
    mouseY.set(ny)
  }

  const reset = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return { mouseX, mouseY, update, reset }
}
