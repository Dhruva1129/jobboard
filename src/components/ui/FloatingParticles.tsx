import { useMemo } from 'react'

interface FloatingParticlesProps {
  count?: number
}

export const FloatingParticles = ({ count = 12 }: FloatingParticlesProps) => {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 3 + Math.random() * 4,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      color: i % 3 === 0
        ? 'rgba(37, 99, 235, 0.3)'
        : i % 3 === 1
          ? 'rgba(124, 58, 237, 0.25)'
          : 'rgba(236, 72, 153, 0.2)',
    })),
  [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: '-10px',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
