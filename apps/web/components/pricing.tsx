import { motion } from "motion/react";
import {
  Video,
  MousePointerClick,
  MonitorPlay,
  Settings2,
  FolderOpenDot,
  Wand2,
  Image as ImageIcon,
} from "lucide-react";

const features = [
  {
    title: "Screen Recorder",
    description: "Native 50 Mbps recording in MP4, MKV, or WebM.",
    icon: <Video className="w-5 h-5" />,
  },
  {
    title: "Video Editor",
    description: "Instant single-timeline import from project folders.",
    icon: <FolderOpenDot className="w-5 h-5" />,
  },
  {
    title: "Magic Regions",
    description: "Simple drag/drop cuts & zooms with mouse tracking.",
    icon: <MousePointerClick className="w-5 h-5" />,
  },
  {
    title: "Fast Demos",
    description: "Smooth cinematic pans in just 3 clicks.",
    icon: <Wand2 className="w-5 h-5" />,
  },
  {
    title: "Backgrounds",
    description: "Solid colors, patterns, or custom JSX support.",
    icon: <ImageIcon className="w-5 h-5" />,
  },
  {
    title: "Lossless Exports",
    description: "4K 60fps exports in web-ready formats.",
    icon: <Settings2 className="w-5 h-5" />,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight instrument-serif-regular text-white mb-6"
          >
            Start making <span className="cursor-target">stunning</span> demos.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-muted-foreground inter-regular leading-relaxed"
          >
            Recso is built for speed and quality. Turn a screen recording into a polished,
            professional product demo in just a few clicks.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 max-w-5xl rounded-3xl ring-1 ring-white/10 bg-white/5 backdrop-blur-2xl sm:mt-20 lg:mx-0 lg:flex"
        >
          {/* Left Pricing Panel */}
          <div className="p-6 sm:p-8 lg:p-10 lg:flex-auto">
            <h3 className="text-2xl sm:text-3xl font-medium tracking-tight instrument-serif-regular text-white">
              Recso Pro
            </h3>
            <p className="mt-4 text-base leading-7 text-muted-foreground inter-regular">
              Everything you need to record, edit, and export perfect product demos effortlessly.
            </p>
            <div className="mt-8 flex items-center gap-x-4">
              <h4 className="flex-none text-sm font-semibold leading-6 text-primary inter-semibold">
                What&apos;s included
              </h4>
              <div className="h-px flex-auto bg-white/10" />
            </div>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-300 sm:grid-cols-2 lg:gap-6 inter-regular"
            >
              {features.map((feature) => (
                <li key={feature.title} className="flex gap-x-3 items-start group">
                  <div className="flex-none w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <strong className="block text-white font-medium mb-1">{feature.title}</strong>
                    <span className="text-muted-foreground">{feature.description}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right CTA Panel */}
          <div className="p-2 lg:mt-0 lg:w-full lg:max-w-md lg:shrink-0">
            <div className="rounded-2xl bg-black/40 border border-white/5 py-10 text-center ring-1 ring-inset ring-white/10 lg:flex lg:flex-col lg:justify-center lg:py-16 h-full relative overflow-hidden group">
              {/* Subtle hover effect */}
              <div className="absolute inset-0 bg-linear-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="mx-auto max-w-xs px-8 relative z-10">
                <p className="text-base font-semibold text-white inter-semibold">Exclusive to Microsoft Store</p>
                <div className="mt-6 flex flex-col items-center justify-center">
                  <div className="flex items-baseline justify-center gap-x-3">
                    <span className="text-4xl font-bold tracking-tight text-muted-foreground/60 line-through decoration-red-500/70 instrument-serif-regular">$59</span>
                    <span className="text-6xl font-bold tracking-tight text-white instrument-serif-regular">$19.99</span>
                  </div>
                  <div className="mt-3 flex items-center justify-center">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest inter-semibold">Includes 7 Days Free Trial</span>
                  </div>
                </div>
                
                <a
                  href="https://apps.microsoft.com/detail/9P697TXC3BCL?hl=en-us&gl=IN&ocid=pdpshare"
                  className="mt-10 flex w-full rounded-xl bg-white px-3 py-4 text-center text-sm font-semibold text-black shadow-sm hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all hover:scale-[1.02] active:scale-[0.98] items-center justify-center gap-2 group/btn cursor-none cursor-target"
                >
                  <MonitorPlay className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                  <span>Get it from Microsoft Store</span>
                </a>
                
                <p className="mt-6 text-xs leading-5 text-gray-500 inter-regular">
                  Currently limited to a 7-day trial. Subject to change.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
