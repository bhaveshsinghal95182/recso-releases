import { Header } from "@/components/header";
import TargetCursor from "@/components/TargetCursor";

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="relative w-full bg-background text-foreground selection:bg-primary/20">
      <Header />
      <div className="w-full">
        {children}
      </div>
      <TargetCursor
        hideDefaultCursor
        parallaxOn
        targetSelector=".cursor-target, .magnet-target"
        hoverDuration={0.3}
        spinDuration={4}
        proximity={20}
      />
    </div>
    )
}