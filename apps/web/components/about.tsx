"use client"
import { motion, useScroll, useTransform, MotionValue } from "motion/react"
import Image from "next/image";
import { useRef } from "react"

const Highlight = ({ children, progress, color }: { children: React.ReactNode, progress: MotionValue<number>, color: string }) => {
  return (
    <span className="relative inline-block whitespace-nowrap px-1">
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
  );
};

export default function About() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const fillProgress = useTransform(scrollYProgress, [0.1, 0.8], [0, 1])

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative h-[150vh] w-full bg-background snap-end snap-always"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center p-4 md:p-8">
        <div className="relative w-full max-w-5xl rounded-3xl border border-border/60 bg-card/30 p-4 md:p-8 lg:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16 overflow-hidden">
          <div className="w-full md:w-1/2 space-y-6 md:space-y-8 z-10 md:pt-8 md:pl-4">
            <div className="space-y-2">
              <h2 className="inter-regular tracking-tight text-3xl lg:text-[2.75rem] leading-[1.1] text-foreground font-medium">
                <span className="instrument-serif-regular block">
                  <span className="cursor-target">
                    Buttery-smooth
                  </span>
                </span>{' '}
                product demos
              </h2>
              <h3 className="inter-regular tracking-tight text-3xl leading-[1.1] text-muted-foreground/80">
                Shouldn&apos;t be Mac-Exclusive
              </h3>
            </div>

            <div className="space-y-4 md:space-y-6 pt-2">
              <p className="inter-regular tracking-tight text-foreground text-base md:text-lg leading-relaxed">
                <Highlight progress={fillProgress} color="#f87171">
                  Dragging keyframes in heavy editors
                </Highlight>{' '}
                like Premiere or DaVinci Resolve just to show off a simple feature{' '}
                <Highlight progress={fillProgress} color="#f87171">
                  shouldn&apos;t slow you down.
                </Highlight>
              </p>
              <p className="inter-regular tracking-tight text-foreground text-base md:text-lg leading-relaxed">
                <Highlight progress={fillProgress} color="rgba(52, 211, 153, 0.6)">
                  <span className="cursor-target">
                    Recso
                  </span>
                  {' '}gives you everything you need
                </Highlight>{' '}
                to create cinematic, auto-zooming demos in minutes, not days.{' '}
                <Highlight progress={fillProgress} color="rgba(52, 211, 153, 0.6)">
                  Exclusively for Windows.
                </Highlight>
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 z-10">
            <div className="relative w-full aspect-5/4 rounded-2xl overflow-hidden shadow-xl border border-border/40">
              <Image
                src="/developer.png"
                alt="Developer"
                className="w-full h-full object-cover"
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
