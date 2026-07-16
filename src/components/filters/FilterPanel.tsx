import { EMPLOYMENT_TYPES, EXPERIENCE_LEVELS, WORK_MODES, SALARY_FLOORS } from '../../constants'
import type { JobFilters, EmploymentType, ExperienceLevel, WorkMode } from '../../types'
import { countActiveFilters, defaultFilters } from '../../utils/jobFilters'

interface FilterPanelProps {
  filters: JobFilters
  onChange: (filters: JobFilters) => void
}

const CheckboxGroup = <T extends string>({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string
  options: T[]
  selected: T[]
  onToggle: (value: T) => void
}) => (
  <fieldset>
    <legend className="text-sm font-semibold text-text-primary">{title}</legend>
    <div className="mt-3 flex flex-col gap-2.5">
      {options.map((option) => (
        <label key={option} className="flex cursor-pointer items-center gap-2.5 text-sm text-text-secondary">
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={() => onToggle(option)}
            className="h-4 w-4 rounded border-border text-accent accent-blue-600 focus-visible:outline-accent"
          />
          {option}
        </label>
      ))}
    </div>
  </fieldset>
)

export const FilterPanel = ({ filters, onChange }: FilterPanelProps) => {
  const toggle = <K extends keyof JobFilters>(key: K, value: string) => {
    const current = filters[key] as unknown as string[]
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
    onChange({ ...filters, [key]: next })
  }

  const activeCount = countActiveFilters(filters)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-text-primary">Filters</h2>
        {activeCount > 0 && (
          <button
            onClick={() => onChange({ ...defaultFilters, query: filters.query })}
            className="text-xs font-medium text-accent transition-all duration-200 hover:text-accent-hover"
          >
            Clear all
          </button>
        )}
      </div>

      <CheckboxGroup
        title="Work mode"
        options={WORK_MODES}
        selected={filters.workModes}
        onToggle={(v: WorkMode) => toggle('workModes', v)}
      />

      <CheckboxGroup
        title="Employment type"
        options={EMPLOYMENT_TYPES}
        selected={filters.employmentTypes}
        onToggle={(v: EmploymentType) => toggle('employmentTypes', v)}
      />

      <CheckboxGroup
        title="Experience level"
        options={EXPERIENCE_LEVELS}
        selected={filters.experienceLevels}
        onToggle={(v: ExperienceLevel) => toggle('experienceLevels', v)}
      />

      <fieldset>
        <legend className="text-sm font-semibold text-text-primary">Salary</legend>
        <div className="mt-3 flex flex-col gap-2.5">
          {SALARY_FLOORS.map((floor) => (
            <label key={floor.value} className="flex cursor-pointer items-center gap-2.5 text-sm text-text-secondary">
              <input
                type="radio"
                name="salary-floor"
                checked={(filters.minSalary ?? 0) === floor.value}
                onChange={() => onChange({ ...filters, minSalary: floor.value || null })}
                className="h-4 w-4 border-border text-accent accent-blue-600"
              />
              {floor.label}
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  )
}
