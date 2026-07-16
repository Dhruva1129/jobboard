import { forwardRef, type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-text-primary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`h-10 rounded-xl border border-border bg-white px-3.5 text-sm text-text-primary placeholder:text-text-secondary outline-none transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-blue-100 ${
            error ? 'border-error' : ''
          } ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-error">{error}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'
