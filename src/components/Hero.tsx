import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import HeroHeadline from './HeroHeadline'
import HeroCollage from './HeroCollage'
import HeroIntro from './HeroIntro'

type Theme = 'light' | 'dark'

export default function Hero(_props: { theme?: Theme }) {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.45])

  return (
    <section className="hero-risheeta" ref={sectionRef}>
      <motion.div
        className="hero-risheeta-inner"
        style={{ scale, opacity, transformOrigin: 'top center' }}
      >
        <HeroHeadline />
        <HeroCollage />
        <HeroIntro />
      </motion.div>
    </section>
  )
}
