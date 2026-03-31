interface VercelLogoProps {
  className?: string
  width?: number | string
  height?: number | string
}

export default function VercelLogo({
  className,
  width = 24,
  height = 24,
}: VercelLogoProps) {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 256 222"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
    >
      <path fill="currentColor" d="m128 0 128 221.705H0z" />
    </svg>
  )
}
