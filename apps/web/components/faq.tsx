"use client"
import { motion, AnimatePresence } from 'motion/react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Add01Icon, MinusSignIcon} from '@hugeicons/core-free-icons'
import { cn } from '@workspace/ui/lib/utils'
import { faqs } from '@/lib/faq-data'
import { useState } from 'react'
import { Button } from '@workspace/ui/components/button'
import  Link  from 'next/link'

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null)
  
  // Only show top 4 FAQs on the homepage
  const homeFaqs = faqs.slice(0, 4)

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-background">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-primary/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight instrument-serif-regular text-foreground mb-6"
          >
            Got <span className="text-primary italic cursor-target">questions?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground inter-regular"
          >
            Quick answers to help you get started.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
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
                      y: { duration: 0.4, delay: index * 0.05 }
                    }}
                    className={cn(
                      "rounded-2xl border transition-colors duration-300 overflow-hidden cursor-none",
                      isOpen 
                        ? "bg-primary/5 border-primary/20 shadow-lg shadow-primary/5" 
                        : "bg-card border-border hover:border-primary/30"
                    )}
                  >
                    <button
                      onClick={() => setOpenId(isOpen ? null : faq.id)}
                      className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none cursor-none"
                    >
                      <span className="text-lg font-medium text-foreground inter-medium pr-8">
                        {faq.question}
                      </span>
                      <div className={cn(
                        "ml-4 shrink-0 flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 cursor-target",
                        isOpen ? "bg-primary text-primary-foreground border-primary rotate-180" : "bg-transparent text-muted-foreground border-border"
                      )}>
                        {isOpen ? <HugeiconsIcon icon={MinusSignIcon} strokeWidth={2} className="h-4 w-4" /> : <HugeiconsIcon icon={Add01Icon} strokeWidth={2} className="h-4 w-4" />}
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
                          <div className="px-6 pb-6 text-muted-foreground inter-regular prose prose-sm dark:prose-invert">
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
          
          <div className="mt-12 text-center flex justify-center">
            <Button variant="ghost" size="lg" className="rounded-full cursor-none cursor-target group py-2 w-full h-full">
              <Link href="/faq" className='flex items-center justify-center'>
                View all FAQs
                <HugeiconsIcon icon={Add01Icon} strokeWidth={2} className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
