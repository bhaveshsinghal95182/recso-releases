import React from 'react'

export interface FAQItem {
  id: string
  question: string
  answer: React.ReactNode
  category: string
}

export const faqs: FAQItem[] = [
  {
    id: '1',
    category: 'General',
    question: 'Is Recso available for Mac?',
    answer:
      'Currently, Recso is built exclusively for Windows utilizing native APIs to achieve buttery-smooth 60fps performance without draining your system resources. We are actively exploring a Mac version for the future.',
  },
  {
    id: '2',
    category: 'General',
    question: 'What happens after the 7-day free trial?',
    answer:
      'After 7 days, your trial will automatically convert to the paid version unless cancelled. You will retain all your projects and settings. We do not place watermarks on your videos during the trial period.',
  },
  {
    id: '3',
    category: 'Features',
    question: 'Can I import existing videos, or only screen record?',
    answer:
      "You can easily import any standard MP4, MKV, or WebM video file directly onto the timeline. You don't have to use the built-in screen recorder if you already have footage.",
  },
  {
    id: '4',
    category: 'Features',
    question: 'How do Custom Backgrounds work?',
    answer:
      'You can choose from a library of built-in premium gradients and patterns, select any solid color, or even drop in custom JSX components to render animated, code-based backgrounds behind your video.',
  },
  {
    id: '5',
    category: 'Export',
    question: 'What are the export limitations?',
    answer:
      "There are no artificial limits. You can export up to 4K resolution at a crisp 60fps. The only limitation is your hardware's encoding capabilities.",
  },
  {
    id: '6',
    category: 'Export',
    question: 'Why is export time so high?',
    answer:
      'Recso currently uses remotion which is like taking a screen shot at each frame and rendering it. This is not efficient and we are working on a better solution.',
  },
  {
    id: '7',
    category: 'Pricing',
    question: 'Is it a one-time purchase or a subscription?',
    answer:
      'Recso Pro is currently available as a highly affordable subscription to support continuous development and updates. Check the Microsoft Store page for the most up-to-date pricing in your region.',
  },
]

export const categories = [
  'All',
  ...Array.from(new Set(faqs.map((faq) => faq.category))),
]
