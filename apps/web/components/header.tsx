"use client"
import Link from "next/link"
import { cn } from "@workspace/ui/lib/utils"
import { useScroll } from "@/hooks/use-scroll"
import { Button } from "@workspace/ui/components/button"
import { MobileNav } from "@/components/mobile-nav"

export const navLinks = [
  {
    label: "Features",
    href: "/features",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
  {
    label: "FAQ",
    href: "/faq",
  },
]

export function Header() {
  const scrolled = useScroll(10)

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 mx-auto w-full max-w-4xl border-b border-transparent md:rounded-md md:border md:transition-all md:ease-out",
        {
          "border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50 md:top-2 md:max-w-3xl md:shadow":
            scrolled,
        }
      )}
    >
      <nav
        className={cn(
          "flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out",
          {
            "md:px-2": scrolled,
          }
        )}
      >
        <Link
          className="proximity-50 cursor-target instrument-serif-regular cursor-none rounded-md p-2 text-2xl hover:bg-muted dark:hover:bg-muted/50"
          href="/"
        >
          Recso
        </Link>
        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Button
              key={link.label}
              size="sm"
              variant="ghost"
              className="cursor-none"
            >
              {link.href.includes("#") ? (
                <a href={link.href}>{link.label}</a>
              ) : (
                <Link href={link.href}>{link.label}</Link>
              )}
            </Button>
          ))}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Link href="https://apps.microsoft.com/detail/9P697TXC3BCL?hl=en-us&gl=IN&ocid=pdpshare">
            <Button
              size="sm"
              className="magnet-target proximity-10 cursor-none p-1 px-3"
            >
              Download
            </Button>
          </Link>
        </div>
        <MobileNav />
      </nav>
    </header>
  )
}
