import { Modal } from './Modal'
import { FilterPanel } from '../filters/FilterPanel'
import { Button } from '../ui/Button'
import type { JobFilters } from '../../types'

interface FilterDrawerProps {
  open: boolean
  onClose: () => void
  filters: JobFilters
  onChange: (filters: JobFilters) => void
  resultCount: number
}

export const FilterDrawer = ({ open, onClose, filters, onChange, resultCount }: FilterDrawerProps) => (
  <Modal open={open} onClose={onClose} title="Filters" side>
    <FilterPanel filters={filters} onChange={onChange} />
    <div className="sticky bottom-0 -mx-6 mt-6 border-t border-border bg-white px-6 pt-4">
      <Button className="w-full" onClick={onClose}>
        Show {resultCount} {resultCount === 1 ? 'job' : 'jobs'}
      </Button>
    </div>
  </Modal>
)
