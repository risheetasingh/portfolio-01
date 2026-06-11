type Theme = 'light' | 'dark'

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4'

export default function Hero({ theme: _theme }: { theme: Theme }) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100svh', background: 'hsl(201 100% 13%)' }}
    >
      {/* Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* Content */}
      <div className="relative z-10 flex flex-col" style={{ minHeight: '100svh' }}>

        {/* Hero text */}
        <div
          className="flex flex-col items-center justify-center text-center px-6 flex-1"
          style={{ paddingTop: '90px', paddingBottom: '90px' }}
        >
          <h1
            className="animate-fade-rise font-normal max-w-7xl"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(2.8rem, 8vw, 6rem)',
              lineHeight: 0.95,
              letterSpacing: '-2.46px',
              color: '#ffffff',
            }}
          >
            I am Risheeta
          </h1>

          <p
            className="animate-fade-rise-delay font-normal mt-3"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(1rem, 2vw, 1.35rem)',
              letterSpacing: '-0.5px',
              color: 'hsl(240 4% 66%)',
            }}
          >
            Product designer at Spectatr.ai
          </p>

          <p
            className="animate-fade-rise-delay text-base sm:text-lg max-w-2xl mt-8 leading-relaxed"
            style={{ color: 'hsl(240 4% 66%)' }}
          >
            I design, collect stories and run toward adrenaline
            at the intersection of AI, systems, and live experiences.
          </p>

        </div>

      </div>
    </section>
  )
}
