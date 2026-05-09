import React from "react"

export interface FAQItem {
  id: string
  question: string
  answer: React.ReactNode
  category: string
}

export const faqs: FAQItem[] = [
  {
    id: "1",
    category: "General",
    question: "Is Recso available for Mac?",
    answer:
      "Currently, Recso is built exclusively for Windows utilizing native APIs to achieve buttery-smooth 60fps performance without draining your system resources. We are actively exploring a Mac version for the future.",
  },
  {
    id: "2",
    category: "General",
    question: "Is Recso free?",
    answer:
      "Yes. Recso is free right now with all the shiny features included. If you are an enterprise customer, contact us on X or LinkedIn and we can talk through the features you want and the price you are ready to pay.",
  },
  {
    id: "4",
    category: "Features",
    question: "How do Custom Backgrounds work?",
    answer:
      "You can choose from a library of built-in premium gradients and patterns, select any solid color, or even drop in custom JSX components to render animated, code-based backgrounds behind your video.",
  },
  {
    id: "5",
    category: "Export",
    question: "What are the export limitations?",
    answer:
      "There are no artificial limits. You can export up to 4K resolution at a crisp 60fps. The only limitation is your hardware's encoding capabilities.",
  },
]

export const categories = [
  "All",
  ...Array.from(new Set(faqs.map((faq) => faq.category))),
]
