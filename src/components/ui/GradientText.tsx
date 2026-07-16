interface GradientTextProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'blue'
}

export const GradientText = ({ children, className = '', variant = 'default' }: GradientTextProps) => (
  <span className={`${variant === 'blue' ? 'gradient-text-blue' : 'gradient-text'} ${className}`}>
    {children}
  </span>
)
