import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: ReactNode
}

export const EmptyState = ({ icon: Icon, title, description, action }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20 px-6 text-center">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-bg-secondary">
      <Icon className="h-5 w-5 text-text-secondary" strokeWidth={1.75} />
    </div>
    <h3 className="mt-4 text-[15px] font-semibold text-text-primary">{title}</h3>
    <p className="mt-1.5 max-w-sm text-sm text-text-secondary">{description}</p>
    {action && <div className="mt-6">{action}</div>}
  </div>
)
