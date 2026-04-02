'use client';
import { motion } from "motion/react"
import {
  Video,
  MousePointerClick,
  MonitorPlay,
  Settings2,
  FolderOpenDot,
  Wand2,
  Image as ImageIcon,
} from "lucide-react"

const features = [
  {
    title: "Screen Recorder",
    description: "Native 50 Mbps recording in MP4, MKV, or WebM.",
    icon: <Video className="h-5 w-5" />,
  },
  {
    title: "Video Editor",
    description: "Instant single-timeline import from project folders.",
    icon: <FolderOpenDot className="h-5 w-5" />,
  },
  {
    title: "Magic Regions",
    description: "Simple drag/drop cuts & zooms with mouse tracking.",
    icon: <MousePointerClick className="h-5 w-5" />,
  },
  {
    title: "Fast Demos",
    description: "Smooth cinematic pans in just 3 clicks.",
    icon: <Wand2 className="h-5 w-5" />,
  },
  {
    title: "Backgrounds",
    description: "Solid colors, patterns, or custom JSX support.",
    icon: <ImageIcon className="h-5 w-5" />,
  },
  {
    title: "Lossless Exports",
    description: "4K 60fps exports in web-ready formats.",
    icon: <Settings2 className="h-5 w-5" />,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden py-24 sm:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 opacity-50 blur-[120px]" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="instrument-serif-regular mb-6 text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Start making <span className="cursor-target">stunning</span> demos.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inter-regular text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Recso is built for speed and quality. Turn a screen recording into a
            polished, professional product demo in just a few clicks.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 max-w-5xl rounded-3xl bg-white/5 ring-1 ring-white/10 backdrop-blur-2xl sm:mt-20 lg:mx-0 lg:flex"
        >
          {/* Left Pricing Panel */}
          <div className="p-6 sm:p-8 lg:flex-auto lg:p-10">
            <h3 className="instrument-serif-regular text-2xl font-medium tracking-tight text-white sm:text-3xl">
              Recso Pro
            </h3>
            <p className="inter-regular mt-4 text-base leading-7 text-muted-foreground">
              Everything you need to record, edit, and export perfect product
              demos effortlessly.
            </p>
            <div className="mt-8 flex items-center gap-x-4">
              <h4 className="inter-semibold flex-none text-sm leading-6 font-semibold text-primary">
                What&apos;s included
              </h4>
              <div className="h-px flex-auto bg-white/10" />
            </div>
            <ul
              role="list"
              className="inter-regular mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-300 sm:grid-cols-2 lg:gap-6"
            >
              {features.map((feature) => (
                <li
                  key={feature.title}
                  className="group flex items-start gap-x-3"
                >
                  <div className="flex h-8 w-8 flex-none items-center justify-center rounded-lg border border-white/10 bg-white/5 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/10">
                    {feature.icon}
                  </div>
                  <div>
                    <strong className="mb-1 block font-medium text-white">
                      {feature.title}
                    </strong>
                    <span className="text-muted-foreground">
                      {feature.description}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right CTA Panel */}
          <div className="p-2 lg:mt-0 lg:w-full lg:max-w-md lg:shrink-0">
            <div className="group relative h-full overflow-hidden rounded-2xl border border-white/5 bg-black/40 py-10 text-center ring-1 ring-white/10 ring-inset lg:flex lg:flex-col lg:justify-center lg:py-16">
              {/* Subtle hover effect */}
              <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10 mx-auto max-w-xs px-8">
                <p className="inter-semibold text-base font-semibold text-white">
                  Exclusive to Microsoft Store
                </p>
                <div className="mt-6 flex flex-col items-center justify-center">
                  <div className="flex items-baseline justify-center gap-x-3">
                    <span className="instrument-serif-regular text-4xl font-bold tracking-tight text-muted-foreground/60 line-through decoration-red-500/70">
                      $59
                    </span>
                    <span className="instrument-serif-regular text-6xl font-bold tracking-tight text-white">
                      $19.99
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-center">
                    <span className="inter-semibold rounded-full bg-primary/10 px-3 py-1 text-xs font-bold tracking-widest text-primary uppercase">
                      Includes 7 Days Free Trial
                    </span>
                  </div>
                </div>

                <a
                  href="https://apps.microsoft.com/detail/9P697TXC3BCL?hl=en-us&gl=IN&ocid=pdpshare"
                  className="group/btn cursor-target mt-10 flex w-full cursor-none items-center justify-center gap-2 rounded-xl bg-white px-3 py-4 text-center text-sm font-semibold text-black shadow-sm transition-all hover:scale-[1.02] hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98]"
                >
                  <MonitorPlay className="h-5 w-5 transition-transform group-hover/btn:scale-110" />
                  <span>Get it from Microsoft Store</span>
                </a>

                <p className="inter-regular mt-6 text-xs leading-5 text-gray-500">
                  Currently limited to a 7-day trial. Subject to change.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
