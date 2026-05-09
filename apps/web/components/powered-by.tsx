import { useRef } from "react"
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  wrap,
} from "motion/react"

import ElectronLogo from "./logos/electron"
import TailwindCSS from "./logos/tailwindcss"
import VercelLogo from "./logos/vercel"
import ViteLogo from "./logos/vite"

const logos = [
  { Component: ElectronLogo, name: "Electron" },
  { Component: TailwindCSS, name: "TailwindCSS" },
  { Component: VercelLogo, name: "Vercel" },
  { Component: ViteLogo, name: "Vite" },
]

function LogoItem({
  Component,
}: {
  Component: (typeof logos)[number]["Component"]
  name: string
}) {
  return (
    <div className="flex shrink-0 items-center gap-3 px-12 grayscale transition-all duration-300 hover:grayscale-0">
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
    <div className="mt-16 flex min-h-screen w-full snap-start flex-col items-center justify-center gap-12 overflow-hidden bg-background">
      <h2 className="inter-regular text-sm tracking-widest text-muted-foreground uppercase">
        Powered By
      </h2>

      <div className="relative flex w-full items-center">
        {/* Left fade/blur */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-32 bg-linear-to-r from-background to-transparent mask-[linear-gradient(to_right,black,transparent)] backdrop-blur-[2px]" />

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
              ))
            )}
          </motion.div>
        </div>

        {/* Right fade/blur */}
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-32 bg-linear-to-l from-background to-transparent mask-[linear-gradient(to_left,black,transparent)] backdrop-blur-[2px]" />
      </div>
    </div>
  )
}
