"use client"
import { motion, AnimatePresence } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, MinusSignIcon } from "@hugeicons/core-free-icons"
import { cn } from "@workspace/ui/lib/utils"
import { faqs } from "@/lib/faq-data"
import { useState } from "react"
import { Button } from "@workspace/ui/components/button"
import Link from "next/link"

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null)

  // Only show top 4 FAQs on the homepage
  const homeFaqs = faqs.slice(0, 4)

  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute top-0 right-0 h-125 w-125 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="instrument-serif-regular mb-6 text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl"
          >
            Got{" "}
            <span className="cursor-target text-primary italic">
              questions?
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inter-regular text-lg text-muted-foreground"
          >
            Quick answers to help you get started.
          </motion.p>
        </div>

        <div className="mx-auto max-w-3xl">
          {/* FAQ List */}
          <div className="grid gap-4">
            <AnimatePresence mode="popLayout">
              {homeFaqs.map((faq, index) => {
                const isOpen = openId === faq.id
                return (
                  <motion.div
                    layout
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      layout: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                      y: { duration: 0.4, delay: index * 0.05 },
                    }}
                    className={cn(
                      "cursor-none overflow-hidden rounded-2xl border transition-colors duration-300",
                      isOpen
                        ? "border-primary/20 bg-primary/5 shadow-lg shadow-primary/5"
                        : "border-border bg-card hover:border-primary/30"
                    )}
                  >
                    <button
                      onClick={() => setOpenId(isOpen ? null : faq.id)}
                      className="flex w-full cursor-none items-center justify-between px-6 py-5 text-left focus:outline-none"
                    >
                      <span className="inter-medium pr-8 text-lg font-medium text-foreground">
                        {faq.question}
                      </span>
                      <div
                        className={cn(
                          "cursor-target ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                          isOpen
                            ? "rotate-180 border-primary bg-primary text-primary-foreground"
                            : "border-border bg-transparent text-muted-foreground"
                        )}
                      >
                        {isOpen ? (
                          <HugeiconsIcon
                            icon={MinusSignIcon}
                            strokeWidth={2}
                            className="h-4 w-4"
                          />
                        ) : (
                          <HugeiconsIcon
                            icon={Add01Icon}
                            strokeWidth={2}
                            className="h-4 w-4"
                          />
                        )}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="inter-regular prose prose-sm dark:prose-invert px-6 pb-6 text-muted-foreground">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          <div className="mt-12 flex justify-center text-center">
            <Button
              variant="ghost"
              size="lg"
              className="cursor-target group h-full w-full cursor-none rounded-full py-2"
            >
              <Link href="/faq" className="flex items-center justify-center">
                View all FAQs
                <HugeiconsIcon
                  icon={Add01Icon}
                  strokeWidth={2}
                  className="ml-2 h-4 w-4"
                />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
