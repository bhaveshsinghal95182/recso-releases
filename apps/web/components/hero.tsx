import Windows from "./svgs/windows"

export default function Hero() {
  return (
    <div className="relative h-full min-h-[calc(100vh-4rem)] w-full snap-center bg-black">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        radial-gradient(circle at 50% 100%, rgba(52, 211, 153, 0.4) 0%, transparent 60%),
        radial-gradient(circle at 50% 100%, rgba(16, 185, 129, 0.3) 0%, transparent 70%),
        radial-gradient(circle at 50% 100%, rgba(6, 95, 70, 0.2) 0%, transparent 80%)
      `,
        }}
      />
      <div className="relative z-10">
        <div className="flex max-w-full flex-col items-center gap-6 px-4 pt-20 sm:px-6 md:pt-32">
          <h1 className="inter-regular text-center text-5xl tracking-tight sm:text-6xl md:text-7xl">
            Create{" "}
            <span className="instrument-serif-regular cursor-target text-primary">
              Cinematic
            </span>{" "}
            Product Demos{" "}
            <span className="block text-center">
              <span className="cursor-target text-primary">in Seconds</span>
            </span>
          </h1>
          <a
            href="https://apps.microsoft.com/detail/9P697TXC3BCL?hl=en-us&gl=IN&ocid=pdpshare"
            className="magnet-target proximity-40 inter-semibold mt-8 flex cursor-none items-center gap-2 rounded-sm bg-primary px-4 py-2 text-xl tracking-tighter text-background shadow-lg shadow-background/10"
          >
            <Windows size="30" />
            Start Creating for Free
          </a>
          <p className="inter-regular -mt-4 text-xs text-muted-foreground">
            7 days free • No credit card required
          </p>
          <div className="w-full max-w-5xl px-2 pt-8 sm:px-6 md:pt-12">
            <video
              src="/demo.mp4"
              autoPlay
              loop
              muted
              className="aspect-video h-auto w-full rounded-lg border-4 border-border object-cover shadow-2xl md:border-8"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
