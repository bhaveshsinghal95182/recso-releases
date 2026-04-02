import { Geist, Geist_Mono } from "next/font/google"
import type { Metadata } from "next"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@workspace/ui/lib/utils"
import ReactLenis from "lenis/react"
import SiteLayout from "@workspace/ui/layout/root-layout"
import { Analytics } from "@vercel/analytics/next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Recso",
    template: "%s | Recso",
  },
  description:
    "Recso helps you record, edit, and export polished demo videos quickly.",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Recso",
    title: "Recso",
    description:
      "Recso helps you record, edit, and export polished demo videos quickly.",
    images: [
      {
        url: "/social.png",
        width: 1200,
        height: 630,
        alt: "Recso",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recso",
    description:
      "Recso helps you record, edit, and export polished demo videos quickly.",
    images: ["/social_com.jpg"],
  },
  icons: {
    icon: "/R.ico",
    shortcut: "/R.ico",
  },
}

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "cursor-hidden antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ReactLenis root>
          <SiteLayout>
            <ThemeProvider>{children}</ThemeProvider>
          </SiteLayout>
        </ReactLenis>
      </body>
      <Analytics />
    </html>
  )
}
