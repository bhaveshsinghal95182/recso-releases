import type { Metadata } from "next"

import Hero from "@/components/hero"
import { Features } from "@/components/features"
import About from "@/components/about"
import { FAQ } from "@/components/faq"

export const metadata: Metadata = {
  title: "Home",
}

function App() {
  return (
    <>
      <Hero />
      <Features />
      <About />
      <FAQ />
    </>
  )
}

export default App

