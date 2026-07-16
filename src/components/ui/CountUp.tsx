import { useEffect, useState, useRef } from 'react'

export const CountUp = ({ end, duration = 2000 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let startTime: number | null = null
    let animationFrame: number

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const animate = (timestamp: number) => {
          if (!startTime) startTime = timestamp
          const progress = Math.min((timestamp - startTime) / duration, 1)
          
          // easeOutExpo
          const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
          
          setCount(Math.floor(easeOut * end))
          
          if (progress < 1) {
            animationFrame = requestAnimationFrame(animate)
          } else {
            setCount(end)
          }
        }
        animationFrame = requestAnimationFrame(animate)
        observer.disconnect()
      }
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
      observer.disconnect()
    }
  }, [end, duration])

  return <span ref={ref}>{count}</span>
}
