import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, LayoutGrid, List, SearchX } from 'lucide-react'
import { SearchBar } from '../components/forms/SearchBar'
import { FilterPanel } from '../components/filters/FilterPanel'
import { ActiveFilterChips } from '../components/filters/ActiveFilterChips'
import { FilterDrawer } from '../components/modals/FilterDrawer'
import { JobCard } from '../components/cards/JobCard'
import { JobCardSkeleton } from '../components/ui/Skeleton'
import { EmptyState } from '../components/ui/EmptyState'
import { Button } from '../components/ui/Button'
import { SORT_OPTIONS } from '../constants'
import type { JobFilters, SortOption } from '../types'
import { defaultFilters, countActiveFilters } from '../utils/jobFilters'
import { useFilteredJobs } from '../hooks/useJobsData'
import { addRecentSearch } from '../services/storage'
import { useDebounce } from '../hooks/useDebounce'

const PAGE_SIZE = 9

export const JobsPage = () => {
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState<JobFilters>({
    ...defaultFilters,
    query: searchParams.get('q') ?? '',
  })
  const [sort, setSort] = useState<SortOption>('newest')
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const debouncedQuery = useDebounce(filters.query, 250)
  const effectiveFilters = useMemo(() => ({ ...filters, query: debouncedQuery }), [filters, debouncedQuery])

  const companyParam = searchParams.get('company')
  const preFiltered = useFilteredJobs(effectiveFilters, sort)
  const results = useMemo(
    () => (companyParam ? preFiltered.filter((j) => j.companyId === companyParam) : preFiltered),
    [preFiltered, companyParam]
  )

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 350)
    return () => clearTimeout(timer)
  }, [effectiveFilters, sort, companyParam])

  useEffect(() => {
    setPage(1)
  }, [effectiveFilters, sort, companyParam])

  useEffect(() => {
    if (debouncedQuery.trim()) addRecentSearch(debouncedQuery)
  }, [debouncedQuery])

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE))
  const paginated = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const activeCount = countActiveFilters(filters)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <SearchBar value={filters.query} onChange={(q) => setFilters((f) => ({ ...f, query: q }))} className="flex-1" />
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 text-sm font-medium text-text-primary transition-all duration-200 hover:bg-bg-secondary lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeCount > 0 && <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-semibold text-white">{activeCount}</span>}
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <FilterPanel filters={filters} onChange={setFilters} />
          </div>
        </aside>

        <div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-text-secondary">
                <span className="font-medium text-text-primary">{results.length}</span> {results.length === 1 ? 'job' : 'jobs'} found
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                aria-label="Sort jobs"
                className="h-9 rounded-lg border border-border bg-white px-3 text-sm text-text-primary outline-none transition-all duration-200 focus:border-accent"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="flex items-center rounded-lg border border-border p-0.5">
                <button
                  onClick={() => setLayout('grid')}
                  aria-label="Grid view"
                  aria-pressed={layout === 'grid'}
                  className={`flex h-8 w-8 items-center justify-center rounded-md transition-all duration-200 ${layout === 'grid' ? 'bg-bg-secondary text-text-primary' : 'text-text-secondary'}`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setLayout('list')}
                  aria-label="List view"
                  aria-pressed={layout === 'list'}
                  className={`flex h-8 w-8 items-center justify-center rounded-md transition-all duration-200 ${layout === 'list' ? 'bg-bg-secondary text-text-primary' : 'text-text-secondary'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <ActiveFilterChips filters={filters} onChange={setFilters} />
          </div>

          <div className={`mt-6 grid gap-4 ${layout === 'grid' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)
              : paginated.map((job) => <JobCard key={job.id} job={job} layout={layout} />)}
          </div>

          {!loading && results.length === 0 && (
            <EmptyState
              icon={SearchX}
              title="No jobs match your search"
              description="Try adjusting your filters or searching for a different role, company, or skill."
              action={
                <Button variant="secondary" onClick={() => setFilters(defaultFilters)}>
                  Clear all filters
                </Button>
              }
            />
          )}

          {!loading && totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <Button variant="secondary" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                Previous
              </Button>
              <span className="px-2 text-sm text-text-secondary">
                Page {page} of {totalPages}
              </span>
              <Button variant="secondary" size="sm" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
                Next
              </Button>
            </div>
          )}
        </div>
      </div>

      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onChange={setFilters}
        resultCount={results.length}
      />
    </div>
  )
}
