"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Add01Icon,
  MinusSignIcon,
  SearchIcon,
} from "@hugeicons/core-free-icons"
import { cn } from "@workspace/ui/lib/utils"
import { faqs, categories, type FAQItem } from "@/lib/faq-data"
import { Button } from "@workspace/ui/components/button"
import Link from "next/link"

export function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [openId, setOpenId] = useState<string | null>(null)

  const filteredFaqs = faqs.filter((faq: FAQItem) => {
    const matchesCategory =
      activeCategory === "All" || faq.category === activeCategory
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof faq.answer === "string" &&
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <section className="relative min-h-screen overflow-hidden bg-background pt-32 pb-24 sm:pt-40 sm:pb-32">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute top-0 right-0 h-125 w-125 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="instrument-serif-regular mb-6 text-4xl font-medium tracking-tight text-foreground sm:text-5xl md:text-6xl"
          >
            Frequently Asked{" "}
            <span className="cursor-target text-primary italic">Questions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inter-regular text-lg text-muted-foreground"
          >
            Everything you need to know about Recso, features, and billing.
          </motion.p>
        </div>

        <div className="mx-auto max-w-4xl">
          {/* Controls: Search & Filter */}
          <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-2 md:justify-start">
              {categories.map((category: string) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category)
                    setOpenId(null) // Close open items on filter change
                  }}
                  className={cn(
                    "inter-medium rounded-full px-4 py-2 text-sm transition-all duration-300",
                    activeCategory === category
                      ? "scale-105 bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "bg-primary/5 text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-64">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <HugeiconsIcon
                  icon={SearchIcon}
                  strokeWidth={2}
                  className="h-4 w-4 text-muted-foreground"
                />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="instrument-serif-regular cursor-target block w-full cursor-none rounded-full border border-border bg-background/50 py-2 pr-3 pl-10 leading-5 placeholder-muted-foreground transition-all focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none sm:text-sm"
              />
            </div>
          </div>

          {/* FAQ Grid / List */}
          <div className="grid gap-4">
            <AnimatePresence mode="popLayout">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq: FAQItem, index: number) => {
                  const isOpen = openId === faq.id
                  return (
                    <motion.div
                      layout
                      key={faq.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
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
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 text-center"
                >
                  <p className="inter-regular mb-4 text-muted-foreground">
                    No questions found matching your search.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setActiveCategory("All")
                    }}
                  >
                    Clear Search
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-16 text-center">
            <p className="inter-regular mb-4 text-muted-foreground">
              Still have questions?
            </p>
            <Button
              size="lg"
              className="cursor-target h-fit w-fit cursor-none p-2 px-4"
            >
              <Link href="https://x.com/Recsoapp">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
