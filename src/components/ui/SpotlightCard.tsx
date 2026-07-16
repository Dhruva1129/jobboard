import { useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  spotlightColor?: string
  to?: string
}

export const SpotlightCard = ({ children, className = '', spotlightColor = 'rgba(37, 99, 235, 0.06)', to }: SpotlightCardProps) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!divRef.current || isFocused) return

    const div = divRef.current
    const rect = div.getBoundingClientRect()

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const handleMouseEnter = () => {}

  const handleMouseLeave = () => {}

  const content = (
    <>
      {/* Spotlight gradient that follows cursor */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      {/* Subtle top gradient border accent on hover */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10 w-full h-full">{children}</div>
    </>
  )

  const commonProps = {
    ref: divRef as any,
    onMouseMove: handleMouseMove,
    onFocus: handleFocus,
    onBlur: handleBlur,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    className: `group relative flex overflow-hidden rounded-2xl border border-border/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-premium ${className}`
  }

  if (to) {
    return (
      <Link to={to} {...commonProps}>
        {content}
      </Link>
    )
  }

  return (
    <div {...commonProps}>
      {content}
    </div>
  )
}
