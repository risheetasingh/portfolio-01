import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform, MotionValue } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

// ── Constants ─────────────────────────────────────────────────────────────────

const HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4'
const FEATURE_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4'
const ICON_1 = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85'
const ICON_2 = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85'
const ICON_3 = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85'
const CREAM = '#E1E0CC'
const EASE = [0.16, 1, 0.3, 1] as const

// ── WordsPullUp ────────────────────────────────────────────────────────────────

function WordsPullUp({
  text,
  className = '',
  delayOffset = 0,
  showAsterisk = false,
}: {
  text: string
  className?: string
  delayOffset?: number
  showAsterisk?: boolean
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const words = text.split(' ')

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1
        return (
          <span key={i} className="overflow-hidden inline-block mr-[0.25em]">
            <motion.span
              className="inline-block relative"
              initial={{ y: 20, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: delayOffset + i * 0.08, ease: EASE }}
            >
              {word}
              {isLast && showAsterisk && (
                <sup
                  style={{
                    position: 'absolute',
                    top: '0.65em',
                    right: '-0.3em',
                    fontSize: '0.31em',
                    color: CREAM,
                  }}
                >
                  *
                </sup>
              )}
            </motion.span>
          </span>
        )
      })}
    </span>
  )
}

// ── WordsPullUpMultiStyle ──────────────────────────────────────────────────────

type Segment = { text: string; className: string }

function WordsPullUpMultiStyle({
  segments,
  delayOffset = 0,
}: {
  segments: Segment[]
  delayOffset?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  const allWords: { word: string; className: string }[] = []
  segments.forEach(seg => {
    seg.text.split(' ').forEach(word => {
      if (word) allWords.push({ word, className: seg.className })
    })
  })

  return (
    <span ref={ref} className="inline-flex flex-wrap justify-center gap-x-[0.25em]">
      {allWords.map((item, i) => (
        <span key={i} className={`overflow-hidden inline-block ${item.className}`}>
          <motion.span
            className="inline-block"
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: delayOffset + i * 0.08, ease: EASE }}
          >
            {item.word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// ── AnimatedLetter ─────────────────────────────────────────────────────────────

function AnimatedLetter({
  char,
  progress,
  index,
  total,
}: {
  char: string
  progress: MotionValue<number>
  index: number
  total: number
}) {
  const charProgress = index / total
  const opacity = useTransform(progress, [charProgress - 0.1, charProgress + 0.05], [0.2, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block whitespace-pre">
      {char}
    </motion.span>
  )
}

// ── Nav ───────────────────────────────────────────────────────────────────────

function PrismaNav() {
  const links = ['Our story', 'Collective', 'Workshops', 'Programs', 'Inquiries']
  return (
    <div className="absolute top-0 left-0 right-0 z-20 flex justify-center">
      <nav
        className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8"
        style={{ fontFamily: 'Almarai, sans-serif' }}
      >
        <ul className="flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
          {links.map(link => (
            <li key={link}>
              <a
                href="#"
                className="text-[10px] sm:text-xs md:text-sm transition-colors duration-200"
                style={{ color: 'rgba(225,224,204,0.8)' }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = CREAM)}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = 'rgba(225,224,204,0.8)')}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

// ── Hero Section ──────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="h-screen p-4 md:p-6" style={{ fontFamily: 'Almarai, sans-serif', background: '#000' }}>
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
        {/* Video */}
        <video
          autoPlay loop muted playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>

        {/* Noise overlay */}
        <div className="noise-overlay absolute inset-0 opacity-[0.7] mix-blend-overlay pointer-events-none z-10" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

        {/* Nav */}
        <PrismaNav />

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 z-20 grid grid-cols-12 items-end p-4 md:p-8 pb-6 md:pb-10">
          {/* Heading — 8 cols */}
          <div className="col-span-12 lg:col-span-8">
            <h1
              className="font-medium leading-[0.85] tracking-[-0.07em]"
              style={{
                fontSize: 'clamp(19vw, 20vw, 22vw)',
                color: CREAM,
              }}
            >
              <WordsPullUp text="Prisma" showAsterisk delayOffset={0} />
            </h1>
          </div>

          {/* Right col — 4 cols */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 pb-2 lg:pb-4">
            <motion.p
              className="text-xs sm:text-sm md:text-base leading-[1.2]"
              style={{ color: `${CREAM}b3` }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            >
              Prisma is a worldwide network of visual artists, filmmakers and storytellers bound not by
              place, status or labels but by passion and hunger to unlock potential through our unique
              perspectives.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: EASE }}
            >
              <button
                className="group flex items-center gap-2 hover:gap-3 transition-all duration-300 rounded-full font-medium text-sm sm:text-base"
                style={{ background: CREAM, color: '#000', padding: '6px 6px 6px 20px' }}
              >
                Join the lab
                <span
                  className="flex items-center justify-center rounded-full bg-black w-9 h-9 sm:w-10 sm:h-10 transition-transform duration-300 group-hover:scale-110"
                >
                  <ArrowRight size={16} color={CREAM} />
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── About Section ─────────────────────────────────────────────────────────────

function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.2'],
  })

  const bodyText =
    'Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals.'

  return (
    <section
      ref={sectionRef}
      className="bg-black py-16 md:py-24 px-4 md:px-6"
      style={{ fontFamily: 'Almarai, sans-serif' }}
    >
      <div
        className="max-w-6xl mx-auto rounded-2xl md:rounded-[2rem] p-8 md:p-16 text-center"
        style={{ background: '#101010' }}
      >
        {/* Label */}
        <p className="text-primary text-[10px] sm:text-xs mb-8 tracking-widest uppercase">
          Visual arts
        </p>

        {/* Main heading */}
        <h2
          className="max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] mb-10"
          style={{
            fontSize: 'clamp(1.75rem, 5vw, 4.5rem)',
            color: CREAM,
          }}
        >
          <WordsPullUpMultiStyle
            segments={[
              { text: 'I am Marcus Chen,', className: 'font-normal' },
              { text: 'a self-taught director.', className: 'font-serif italic' },
              {
                text: 'I have skills in color grading, visual effects, and narrative design.',
                className: 'font-normal',
              },
            ]}
            delayOffset={0}
          />
        </h2>

        {/* Scroll-animated body */}
        <p className="text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          {bodyText.split('').map((char, i) => (
            <AnimatedLetter
              key={i}
              char={char}
              progress={scrollYProgress}
              index={i}
              total={bodyText.length}
            />
          ))}
        </p>
      </div>
    </section>
  )
}

// ── Feature Card ──────────────────────────────────────────────────────────────

function FeatureCard({
  number,
  title,
  icon,
  items,
  delay,
}: {
  number: string
  title: string
  icon: string
  items: string[]
  delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl p-6 flex flex-col justify-between h-full"
      style={{ background: '#212121', minHeight: 320 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div>
        <img src={icon} alt="" className="w-10 h-10 sm:w-12 sm:h-12 rounded mb-5 object-cover" />
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-sm sm:text-base font-medium" style={{ color: CREAM }}>
            {title}
          </h3>
          <span className="text-xs text-gray-500 ml-2 mt-0.5">{number}</span>
        </div>
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check size={13} className="text-primary mt-0.5 shrink-0" />
              <span className="text-gray-400 text-xs sm:text-sm leading-snug">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <button
          className="flex items-center gap-1 text-xs sm:text-sm group"
          style={{ color: CREAM }}
        >
          Learn more
          <ArrowRight
            size={13}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{ transform: 'rotate(-45deg)' }}
          />
        </button>
      </div>
    </motion.div>
  )
}

function VideoFeatureCard({ delay }: { delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className="relative rounded-2xl overflow-hidden flex flex-col justify-end h-full"
      style={{ minHeight: 320 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={FEATURE_VIDEO} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      <p
        className="relative z-10 p-6 text-base sm:text-lg font-medium"
        style={{ color: CREAM }}
      >
        Your creative canvas.
      </p>
    </motion.div>
  )
}

// ── Features Section ──────────────────────────────────────────────────────────

function FeaturesSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <section
      className="relative min-h-screen bg-black py-16 md:py-24 px-4 md:px-6"
      style={{ fontFamily: 'Almarai, sans-serif' }}
    >
      {/* Noise bg */}
      <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-snug"
          >
            <WordsPullUpMultiStyle
              segments={[
                {
                  text: 'Studio-grade workflows for visionary creators.',
                  className: '',
                },
              ]}
              delayOffset={0}
            />
          </h2>
          <p
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-gray-500 mt-1"
            style={{ color: '' }}
          >
            <WordsPullUpMultiStyle
              segments={[
                {
                  text: 'Built for pure vision. Powered by art.',
                  className: 'text-gray-500',
                },
              ]}
              delayOffset={0.2}
            />
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]">
          <VideoFeatureCard delay={0} />
          <FeatureCard
            number="01"
            title="Project Storyboard."
            icon={ICON_1}
            delay={0.15}
            items={[
              'Visual timeline for your entire project',
              'Drag-and-drop scene ordering',
              'Collaborative annotation tools',
              'Export to industry formats',
            ]}
          />
          <FeatureCard
            number="02"
            title="Smart Critiques."
            icon={ICON_2}
            delay={0.30}
            items={[
              'AI-powered visual analysis',
              'Contextual creative notes',
              'Integration with editing tools',
            ]}
          />
          <FeatureCard
            number="03"
            title="Immersion Capsule."
            icon={ICON_3}
            delay={0.45}
            items={[
              'Silence notifications during deep work',
              'Ambient soundscapes for focus',
              'Sync with your creative schedule',
            ]}
          />
        </div>
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PrismaDemo() {
  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
    </div>
  )
}
