import { Search, X } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  autoFocus?: boolean
}

export const SearchBar = ({ value, onChange, placeholder = 'Search by title, company, or skill', className = '', autoFocus }: SearchBarProps) => (
  <div className={`relative flex items-center group ${className}`}>
    <Search className="pointer-events-none absolute left-5 h-5 w-5 text-text-secondary transition-colors duration-200 group-focus-within:text-accent" />
    <input
      type="text"
      value={value}
      autoFocus={autoFocus}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label="Search jobs"
      className="h-14 w-full rounded-2xl border border-border bg-white pl-13 pr-12 text-[15px] text-text-primary placeholder:text-text-secondary/70 outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_4px_rgba(37,99,235,0.1)] focus:ring-0"
    />
    {value && (
      <button
        onClick={() => onChange('')}
        aria-label="Clear search"
        className="absolute right-4 rounded-full p-1 text-text-secondary transition-all duration-200 hover:bg-bg-secondary hover:text-text-primary active:scale-95"
      >
        <X className="h-4 w-4" />
      </button>
    )}
  </div>
)
