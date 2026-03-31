import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Add01Icon, MinusSignIcon, SearchIcon } from '@hugeicons/core-free-icons'
import { cn } from '@workspace/ui/lib/utils'
import { faqs, categories, type FAQItem } from '@/lib/faq-data'
import { Button } from '@workspace/ui/components/button'

export function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)

  const filteredFaqs = faqs.filter((faq: FAQItem) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (typeof faq.answer === 'string' && faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden bg-background min-h-screen">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-primary/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight instrument-serif-regular text-foreground mb-6"
          >
            Frequently Asked <span className="text-primary italic cursor-target">Questions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground inter-regular"
          >
            Everything you need to know about Recso, features, and billing.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Controls: Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {categories.map((category: string) => (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category)
                    setOpenId(null) // Close open items on filter change
                  }}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm inter-medium transition-all duration-300 ",
                    activeCategory === category
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-105"
                      : "bg-primary/5 text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HugeiconsIcon icon={SearchIcon} strokeWidth={2} className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-border rounded-full leading-5 bg-background/50 placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-all instrument-serif-regular cursor-none cursor-target"
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
                          {isOpen ? (
                            <HugeiconsIcon icon={MinusSignIcon} strokeWidth={2} className="h-4 w-4" />
                          ) : (
                            <HugeiconsIcon icon={Add01Icon} strokeWidth={2} className="h-4 w-4" />
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
                            <div className="px-6 pb-6 text-muted-foreground inter-regular prose prose-sm dark:prose-invert">
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
                  className="text-center py-12"
                >
                  <p className="text-muted-foreground inter-regular mb-4">No questions found matching your search.</p>
                  <Button variant="outline" onClick={() => { setSearchQuery(''); setActiveCategory('All') }}>
                    Clear Search
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-muted-foreground inter-regular mb-4">Still have questions?</p>
            <Button size="lg" className="cursor-none cursor-target p-2 px-4 h-fit w-fit">
              <a href="mailto:work.bhavesh22@gmail.com">Contact Support</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
