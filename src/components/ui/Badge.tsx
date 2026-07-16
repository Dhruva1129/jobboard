import type { ReactNode } from 'react'

type BadgeVariant = 'default' | 'accent' | 'success' | 'outline'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-bg-secondary/60 text-text-secondary hover:bg-bg-secondary transition-colors duration-200',
  accent: 'bg-blue-50/70 text-blue-700 hover:bg-blue-50 transition-colors duration-200',
  success: 'bg-green-50/70 text-green-700 hover:bg-green-50 transition-colors duration-200',
  outline: 'border border-border/60 text-text-secondary hover:border-border transition-colors duration-200',
}

export const Badge = ({ children, variant = 'default', className = '' }: BadgeProps) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`}
  >
    {children}
  </span>
)
