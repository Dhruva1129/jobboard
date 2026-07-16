import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

interface Crumb {
  label: string
  to?: string
}

export const Breadcrumb = ({ items }: { items: Crumb[] }) => (
  <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
    {items.map((item, i) => (
      <span key={i} className="flex items-center gap-1.5">
        {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-text-secondary" />}
        {item.to ? (
          <Link to={item.to} className="text-text-secondary transition-all duration-200 hover:text-text-primary">
            {item.label}
          </Link>
        ) : (
          <span className="font-medium text-text-primary">{item.label}</span>
        )}
      </span>
    ))}
  </nav>
)
