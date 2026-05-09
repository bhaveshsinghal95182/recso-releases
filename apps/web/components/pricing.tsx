"use client"
import { motion } from "motion/react"
import Link from "next/link"

export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden py-24 sm:py-32">
      {/* <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 opacity-50 blur-[120px]" /> */}

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="instrument-serif-regular mb-6 text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Recso is free for everyone to use
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inter-regular text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            No trial, no paid tier, and no gated features. Recso ships free for
            everyone, with enterprise conversations handled directly on{" "}
            <Link href={`https://x.com/Recsoapp`} className="hover:underline">
              X
            </Link>{" "}
            or{" "}
            <Link
              href={`https://www.linkedin.com/in/bhavesh-singhal-2400a4328`}
              className="hover:underline"
            >
              LinkedIn
            </Link>
            .
          </motion.p>
        </div>
      </div>
    </section>
  )
}
