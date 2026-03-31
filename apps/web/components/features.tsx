"use client"
import { motion, AnimatePresence, useAnimationControls } from 'motion/react'
import { useState, useEffect } from 'react'
import {
  Wand2,
  Video,
  MousePointerClick,
  FolderOpenDot,
  Gauge,
  MonitorPlay,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const features = [
  {
    name: 'Screen Recorder',
    heading: 'pixel-perfect.',
    description:
      'Built-in native screen recording capturing crisp details up to 50 Mbps in MP4, MKV, or WebM.',
    icon: Video,
  },
  {
    name: 'Linear Video Editor',
    heading: 'seamless workflows.',
    description:
      'Every project is a folder. Open it, and your video is instantly imported onto a single, snappy timeline.',
    icon: FolderOpenDot,
  },
  {
    name: 'Magic Regions',
    heading: 'effortless tracking.',
    description:
      'Drag, drop, and resize UI for cuts and zooms. Click once to make the region flawlessly track your cursor.',
    icon: MousePointerClick,
  },
  {
    name: '3-Click Demos',
    heading: 'cinematic motion.',
    description:
      'Say goodbye to complex keyframes. Create stunning cinematics, zooms, and panning effects with just three clicks.',
    icon: Wand2,
  },
  {
    name: 'Lossless Export',
    heading: 'stunning fidelity.',
    description:
      'Export your final masterpiece at up to 4K 60fps. Ready to share on the web with stunning fidelity.',
    icon: Gauge,
  },
  {
    name: 'Custom Backgrounds',
    heading: 'brand identity.',
    description:
      'Wrap your video in solid colors, premium built-in patterns, or bring any custom JSX element from patterncraft.fun.',
    icon: MonitorPlay,
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
        width: '100%',
        transition: { duration: 5, ease: 'linear' },
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
    progressControls.set({ width: '0%' })
    setActiveIndex((prev) => (prev + 1) % features.length)
  }

  const handlePrev = () => {
    progressControls.set({ width: '0%' })
    setActiveIndex((prev) => (prev - 1 + features.length) % features.length)
  }

  const handleDotClick = (idx: number) => {
    progressControls.set({ width: '0%' })
    setActiveIndex(idx)
  }

  const activeFeature = features[activeIndex]
  const ActiveIcon = activeFeature?.icon ?? Video

  return (
    <section
      id="features"
      className="relative bg-background py-24 md:py-32 overflow-hidden flex items-center min-h-[80vh]"
    >
      <div className="absolute inset-0 pointer-events-none" />
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">
        {/* Left Side: Header & Context */}
        <div className="w-full md:w-5/12 text-center md:text-left flex flex-col items-center md:items-start">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground instrument-serif-regular mb-6"
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
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="absolute inset-0 text-brand italic"
                >
                  <span className="cursor-target">{activeFeature?.heading}</span>
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg leading-relaxed text-muted-foreground inter-regular mb-10 max-w-lg"
          >
            Discover how Recso combines a powerful screen recorder with an
            intuitive timeline editor. Fast, sleek, and native.
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
              className="p-3 md:p-4 rounded-full bg-brand/5 hover:bg-brand/10 text-foreground/80 hover:text-brand transition-all border border-brand/10 hover:border-brand/30 cursor-none cursor-target"
              aria-label="Previous feature"
            >
              <ChevronLeft
                className="w-5 h-5 md:w-6 md:h-6"
                strokeWidth={2.5}
              />
            </button>
            <button
              onClick={handleNext}
              className="p-3 md:p-4 rounded-full bg-brand/5 hover:bg-brand/10 text-foreground/80 hover:text-brand transition-all border border-brand/10 hover:border-brand/30 cursor-none cursor-target"
              aria-label="Next feature"
            >
              <ChevronRight
                className="w-5 h-5 md:w-6 md:h-6"
                strokeWidth={2.5}
              />
            </button>
          </motion.div>
        </div>

        {/* Right Side: Interactive Feature Display */}
        <div
          className="w-full md:w-6/12 relative h-[450px] md:h-[500px] cursor-target"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Interactive Display Box */}
          <div className="absolute inset-0 rounded-[2.5rem] bg-brand/5 border border-brand/10 shadow-2xl backdrop-blur-3xl overflow-hidden flex flex-col p-6 sm:p-10 lg:p-14">
            {/* Progress Indicators */}
            <div className="w-full flex gap-2 mb-10">
              {features.map((_, idx) => (
                <button
                  key={idx}
                  className="h-1.5 flex-1 rounded-full bg-foreground/10 overflow-hidden hover:bg-foreground/20 transition-colors relative cursor-none cursor-target"
                  onClick={() => handleDotClick(idx)}
                  aria-label={`Go to feature ${idx + 1}`}
                >
                  {idx === activeIndex && (
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-brand"
                      initial={{ width: '0%' }}
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
            <div className="flex-1 flex flex-col justify-center relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature?.name}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="absolute inset-0 flex flex-col justify-center pointer-events-auto z-10"
                >
                  <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-2xl bg-brand/10 ring-1 ring-brand/20 mb-6 md:mb-8 overflow-hidden shadow-lg shadow-brand/20">
                    <motion.div
                      animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <ActiveIcon
                        className="h-8 w-8 md:h-10 md:w-10 text-brand"
                        strokeWidth={1.5}
                      />
                    </motion.div>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-medium text-foreground instrument-serif-regular mb-3 md:mb-4">
                    {activeFeature?.name}
                  </h3>
                  <p className="text-lg md:text-xl leading-relaxed text-muted-foreground inter-regular max-w-md">
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
              repeatType: 'reverse',
            }}
            className="absolute -top-20 -right-20 w-[300px] h-[300px] bg-brand/20 rounded-full blur-[100px] -z-10"
          />
        </div>
      </div>
    </section>
  )
}
