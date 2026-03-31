import Windows from './svgs/windows'

export default function Hero() {
  return (
    <div className="min-h-[calc(100vh-4rem)] snap-center h-full w-full bg-black relative">
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
        <div className="max-w-full flex flex-col items-center pt-20 md:pt-32 gap-6 px-4 sm:px-6">
          <h1 className="inter-regular text-5xl sm:text-6xl md:text-7xl tracking-tight text-center">
            Create{' '}
            <span className="instrument-serif-regular text-primary cursor-target">
              Cinematic
            </span>{' '}
            Product Demos{' '}
            <span className="block text-center">
              <span className="text-primary cursor-target">in Seconds</span>
            </span>
          </h1>
          <a href="https://apps.microsoft.com/detail/9P697TXC3BCL?hl=en-us&gl=IN&ocid=pdpshare" className="magnet-target proximity-40 cursor-none text-xl tracking-tighter bg-primary text-background px-4 py-2 rounded-sm flex items-center gap-2 inter-semibold shadow-lg shadow-background/10 mt-8">
            <Windows size="30" />
            Start Creating for Free
          </a>
          <p className="text-muted-foreground inter-regular text-xs -mt-4">
            7 days free • No credit card required
          </p>
          <div className="pt-8 md:pt-12 w-full max-w-5xl px-2 sm:px-6">
            <video
              src="/demo.mp4"
              autoPlay
              loop
              muted
              className="w-full h-auto aspect-video border-4 md:border-8 border-border object-cover rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
