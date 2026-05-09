import type { Metadata } from "next"

import { Features } from "@/components/features"

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore what Recso can do, including webcam capture, desktop capture, mic audio, custom cursors, backgrounds, and high-quality exports.",
}

export default function FeaturesPage() {
  return (
    <main>
      <Features />
    </main>
  )
}