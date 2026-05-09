"use client"
import { motion, AnimatePresence, useAnimationControls } from "motion/react"
import { useState, useEffect } from "react"
import {
  Webcam,
  Monitor,
  Mic,
  MousePointer2,
  Gauge,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const features = [
  {
    name: "Webcam Capture",
    heading: "face-cam ready.",
    description:
      "Record your face cam alongside your demo so your audience sees both the product and the presenter.",
    icon: Webcam,
  },
  {
    name: "Desktop Capture",
    heading: "desktop aware.",
    description:
      "Capture a full display or a single app window when you want a tighter, cleaner demo.",
    icon: Monitor,
  },
  {
    name: "Mic Audio",
    heading: "voice included.",
    description:
      "Record narration directly with your screen capture so the final demo stays synced and understandable.",
    icon: Mic,
  },
  {
    name: "Custom Cursors",
    heading: "pointer polish.",
    description:
      "Show, hide, or stylize the cursor so clicks and motion feel intentional in every recording.",
    icon: MousePointer2,
  },
  {
    name: "Lossless Export",
    heading: "quality intact.",
    description:
      "Export polished demos at up to 4K 60fps so the final result stays sharp and ready to share.",
    icon: Gauge,
  },
  {
    name: "Custom Backgrounds",
    heading: "brand ready.",
    description:
      "Use solid colors, built-in patterns, or custom JSX backgrounds to keep the visual style on brand.",
    icon: Sparkles,
  },
]

export function Features() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const progressControls = useAnimationControls()

  // Track the progress imperatively so we can pause and resume
  useEffect(() => {
    if (isHovered) {
      progressControls.stop()
      return
    }

    // Start or resume animation to 100%
    // We use a duration based on how long a slide should typically take.
    // If we were paused, it resumes from current animated width to 100%.
    const startProgress = async () => {
      // The ease linear is crucial here so that a 5s duration actually looks steady.
      await progressControls.start({
        width: "100%",
        transition: { duration: 5, ease: "linear" },
      })
      // When animation finishes naturally (not stopped by hover or unmount), go to next slide.
      if (!isHovered) {
        setActiveIndex((prev) => (prev + 1) % features.length)
      }
    }

    startProgress()

    return () => progressControls.stop()
  }, [activeIndex, isHovered, progressControls])

  const handleNext = () => {
    progressControls.set({ width: "0%" })
    setActiveIndex((prev) => (prev + 1) % features.length)
  }

  const handlePrev = () => {
    progressControls.set({ width: "0%" })
    setActiveIndex((prev) => (prev - 1 + features.length) % features.length)
  }

  const handleDotClick = (idx: number) => {
    progressControls.set({ width: "0%" })
    setActiveIndex(idx)
  }

  const activeFeature = features[activeIndex]
  const ActiveIcon = activeFeature?.icon ?? Webcam

  return (
    <section
      id="features"
      className="relative flex min-h-[80vh] items-center overflow-hidden bg-background py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0" />
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/5 blur-[120px]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-12 px-6 md:flex-row lg:gap-24 lg:px-12">
        {/* Left Side: Header & Context */}
        <div className="flex w-full flex-col items-center text-center md:w-5/12 md:items-start md:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="instrument-serif-regular mb-6 text-4xl font-medium tracking-tight text-foreground md:text-6xl lg:text-7xl"
          >
            Everything you need,
            <br />
            <div className="relative h-[1.2em] overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={activeFeature?.heading}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute inset-0 text-brand italic"
                >
                  <span className="cursor-target">
                    {activeFeature?.heading}
                  </span>
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inter-regular mb-10 max-w-lg text-lg leading-relaxed text-muted-foreground"
          >
            Recso gives you the tools to record with webcam, desktop, mic audio,
            and custom cursor support, then export clean demos with on-brand
            backgrounds and high-quality output.
          </motion.p>

          {/* Navigation Arrows */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4"
          >
            <button
              onClick={handlePrev}
              className="cursor-target cursor-none rounded-full border border-brand/10 bg-brand/5 p-3 text-foreground/80 transition-all hover:border-brand/30 hover:bg-brand/10 hover:text-brand md:p-4"
              aria-label="Previous feature"
            >
              <ChevronLeft
                className="h-5 w-5 md:h-6 md:w-6"
                strokeWidth={2.5}
              />
            </button>
            <button
              onClick={handleNext}
              className="cursor-target cursor-none rounded-full border border-brand/10 bg-brand/5 p-3 text-foreground/80 transition-all hover:border-brand/30 hover:bg-brand/10 hover:text-brand md:p-4"
              aria-label="Next feature"
            >
              <ChevronRight
                className="h-5 w-5 md:h-6 md:w-6"
                strokeWidth={2.5}
              />
            </button>
          </motion.div>
        </div>

        {/* Right Side: Interactive Feature Display */}
        <div
          className="cursor-target relative h-[450px] w-full md:h-[500px] md:w-6/12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Interactive Display Box */}
          <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[2.5rem] border border-brand/10 bg-brand/5 p-6 shadow-2xl backdrop-blur-3xl sm:p-10 lg:p-14">
            {/* Progress Indicators */}
            <div className="mb-10 flex w-full gap-2">
              {features.map((_, idx) => (
                <button
                  key={idx}
                  className="cursor-target relative h-1.5 flex-1 cursor-none overflow-hidden rounded-full bg-foreground/10 transition-colors hover:bg-foreground/20"
                  onClick={() => handleDotClick(idx)}
                  aria-label={`Go to feature ${idx + 1}`}
                >
                  {idx === activeIndex && (
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-brand"
                      initial={{ width: "0%" }}
                      animate={progressControls}
                    />
                  )}
                  {idx < activeIndex && (
                    <div className="absolute inset-0 bg-brand/50" />
                  )}
                </button>
              ))}
            </div>

            {/* Dynamic Content with Smooth Cross-fades */}
            <div className="relative flex flex-1 flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature?.name}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="pointer-events-auto absolute inset-0 z-10 flex flex-col justify-center"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-brand/10 shadow-lg ring-1 shadow-brand/20 ring-brand/20 md:mb-8 md:h-20 md:w-20">
                    <motion.div
                      animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <ActiveIcon
                        className="h-8 w-8 text-brand md:h-10 md:w-10"
                        strokeWidth={1.5}
                      />
                    </motion.div>
                  </div>
                  <h3 className="instrument-serif-regular mb-3 text-3xl font-medium text-foreground md:mb-4 md:text-4xl">
                    {activeFeature?.name}
                  </h3>
                  <p className="inter-regular max-w-md text-lg leading-relaxed text-muted-foreground md:text-xl">
                    {activeFeature?.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Decorative background blurs behind the card */}
          <motion.div
            animate={{
              rotate: activeIndex * 45,
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute -top-20 -right-20 -z-10 h-[300px] w-[300px] rounded-full bg-brand/20 blur-[100px]"
          />
        </div>
      </div>
    </section>
  )
}
