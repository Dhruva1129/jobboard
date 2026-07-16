import { X } from 'lucide-react'
import type { JobFilters } from '../../types'

interface ActiveFilterChipsProps {
  filters: JobFilters
  onChange: (filters: JobFilters) => void
}

export const ActiveFilterChips = ({ filters, onChange }: ActiveFilterChipsProps) => {
  const chips: { label: string; onRemove: () => void }[] = [
    ...filters.workModes.map((v) => ({
      label: v,
      onRemove: () => onChange({ ...filters, workModes: filters.workModes.filter((x) => x !== v) }),
    })),
    ...filters.employmentTypes.map((v) => ({
      label: v,
      onRemove: () => onChange({ ...filters, employmentTypes: filters.employmentTypes.filter((x) => x !== v) }),
    })),
    ...filters.experienceLevels.map((v) => ({
      label: v,
      onRemove: () => onChange({ ...filters, experienceLevels: filters.experienceLevels.filter((x) => x !== v) }),
    })),
    ...(filters.minSalary
      ? [{ label: `$${filters.minSalary / 1000}k+`, onRemove: () => onChange({ ...filters, minSalary: null }) }]
      : []),
  ]

  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip, i) => (
        <button
          key={i}
          onClick={chip.onRemove}
          className="flex items-center gap-1.5 rounded-lg border border-border bg-white px-2.5 py-1 text-xs font-medium text-text-primary transition-all duration-200 hover:bg-bg-secondary"
        >
          {chip.label}
          <X className="h-3 w-3 text-text-secondary" />
        </button>
      ))}
    </div>
  )
}
