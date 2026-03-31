import { useRef } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap,
} from 'motion/react'

import ElectronLogo from './logos/electron'
import FfmpegLogo from './logos/ffmpeg'
import RemotionLogo from './logos/remotion'
import TailwindCSS from './logos/tailwindcss'
import VercelLogo from './logos/vercel'
import ViteLogo from './logos/vite'

const logos = [
  { Component: ElectronLogo, name: 'Electron' },
  { Component: FfmpegLogo, name: 'Ffmpeg' },
  { Component: RemotionLogo, name: 'Remotion' },
  { Component: TailwindCSS, name: 'TailwindCSS' },
  { Component: VercelLogo, name: 'Vercel' },
  { Component: ViteLogo, name: 'Vite' },
]

function LogoItem({
  Component,
}: {
  Component: (typeof logos)[number]['Component']
  name: string
}) {
  return (
    <div className="flex items-center gap-3 px-12 shrink-0 grayscale hover:grayscale-0 transition-all duration-300 ">
      <Component width={64} height={64} />
      {/* <span className="text-muted-foreground text-lg inter-regular whitespace-nowrap">
        {name}
      </span> */}
    </div>
  )
}

export default function PoweredBy() {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  })

  // Magic number for the threshold where it loops seamlessly.
  // We use wrap to keep the value between -50% and 0%
  // so it jumps back to start and repeats infinitely.
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)

  const directionFactor = useRef<number>(1)
  const isHovered = useRef<boolean>(false)

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * -0.02 * (delta / 16.66) // Base speed

    // Increase speed and change direction based on scroll
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }

    // Add extra scroll-based speed
    moveBy += directionFactor.current * moveBy * velocityFactor.get()

    // Pause on hover
    if (isHovered.current) {
      moveBy = 0
    }

    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="snap-start min-h-screen w-full bg-background flex flex-col items-center justify-center gap-12 overflow-hidden mt-16">
      <h2 className="text-muted-foreground text-sm tracking-widest uppercase inter-regular">
        Powered By
      </h2>

      <div className="relative w-full flex items-center">
        {/* Left fade/blur */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-linear-to-r from-background to-transparent backdrop-blur-[2px] mask-[linear-gradient(to_right,black,transparent)]" />

        <div className="w-full overflow-hidden">
          <motion.div
            className="flex items-center"
            style={{ x }}
            onMouseEnter={() => (isHovered.current = true)}
            onMouseLeave={() => (isHovered.current = false)}
            // Make sure touch devices also register
            onTouchStart={() => (isHovered.current = true)}
            onTouchEnd={() => (isHovered.current = false)}
          >
            {/* We need enough duplicates to fill 200% width so that when we shift by -50% we still see 100% full content */}
            {Array.from({ length: 12 }).map((_, setIndex) =>
              logos.map((logo, i) => (
                <LogoItem
                  key={`${setIndex}-${i}`}
                  Component={logo.Component}
                  name={logo.name}
                />
              )),
            )}
          </motion.div>
        </div>

        {/* Right fade/blur */}
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none bg-linear-to-l from-background to-transparent backdrop-blur-[2px] mask-[linear-gradient(to_left,black,transparent)]" />
      </div>
    </div>
  )
}
