"use client"
import { motion, useScroll, useTransform, MotionValue } from "motion/react"
import Image from "next/image"
import { useRef } from "react"

const Highlight = ({
  children,
  progress,
  color,
}: {
  children: React.ReactNode
  progress: MotionValue<number>
  color: string
}) => {
  return (
    <span className="relative inline-block px-1 whitespace-nowrap">
      <motion.span
        className="absolute inset-0 -z-10 rounded-sm"
        style={{
          backgroundColor: color,
          scaleX: progress,
          transformOrigin: "left",
        }}
      />
      {children}
    </span>
  )
}

export default function About() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const fillProgress = useTransform(scrollYProgress, [0.1, 0.8], [0, 1])

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative h-[150vh] w-full snap-end snap-always bg-background"
    >
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center p-4 md:p-8">
        <div className="relative flex w-full max-w-5xl flex-col items-center gap-8 overflow-hidden rounded-3xl border border-border/60 bg-card/30 p-4 md:flex-row md:gap-12 md:p-8 lg:gap-16 lg:p-12">
          <div className="z-10 w-full space-y-6 md:w-1/2 md:space-y-8 md:pt-8 md:pl-4">
            <div className="space-y-2">
              <h2 className="inter-regular text-3xl leading-[1.1] font-medium tracking-tight text-foreground lg:text-[2.75rem]">
                <span className="instrument-serif-regular block">
                  <span className="cursor-target">Buttery-smooth</span>
                </span>{" "}
                product demos
              </h2>
              <h3 className="inter-regular text-3xl leading-[1.1] tracking-tight text-muted-foreground/80">
                Shouldn&apos;t be Mac-Exclusive
              </h3>
            </div>

            <div className="space-y-4 pt-2 md:space-y-6">
              <p className="inter-regular text-base leading-relaxed tracking-tight text-foreground md:text-lg">
                <Highlight progress={fillProgress} color="#f87171">
                  Dragging keyframes in heavy editors
                </Highlight>{" "}
                like Premiere or DaVinci Resolve just to show off a simple
                feature{" "}
                <Highlight progress={fillProgress} color="#f87171">
                  shouldn&apos;t slow you down.
                </Highlight>
              </p>
              <p className="inter-regular text-base leading-relaxed tracking-tight text-foreground md:text-lg">
                <Highlight
                  progress={fillProgress}
                  color="rgba(52, 211, 153, 0.6)"
                >
                  <span className="cursor-target">Recso</span> gives you
                  everything you need
                </Highlight>{" "}
                to create cinematic, auto-zooming demos in minutes, not days.{" "}
                <Highlight
                  progress={fillProgress}
                  color="rgba(52, 211, 153, 0.6)"
                >
                  Exclusively for Windows.
                </Highlight>
              </p>
            </div>
          </div>

          <div className="z-10 w-full md:w-1/2">
            <div className="relative aspect-5/4 w-full overflow-hidden rounded-2xl border border-border/40 shadow-xl">
              <Image
                src="/developer.png"
                alt="Developer"
                className="h-full w-full object-cover"
                width={430}
                height={350}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
