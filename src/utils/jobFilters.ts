import type { Job, JobFilters, SortOption } from '../types'
import { getCompanyById } from '../data/companies'

export const searchJobs = <T extends Job>(jobs: T[], query: string): T[] => {
  if (!query.trim()) return jobs
  const q = query.toLowerCase().trim()
  return jobs.filter((job) => {
    const company = getCompanyById(job.companyId)
    return (
      job.title.toLowerCase().includes(q) ||
      company?.name.toLowerCase().includes(q) ||
      job.location.toLowerCase().includes(q) ||
      job.skills.some((s) => s.toLowerCase().includes(q))
    )
  })
}

export const filterJobs = <T extends Job>(jobs: T[], filters: JobFilters): T[] => {
  return jobs.filter((job) => {
    if (filters.locations.length && !filters.locations.includes(job.location)) return false
    if (filters.employmentTypes.length && !filters.employmentTypes.includes(job.employmentType)) return false
    if (filters.experienceLevels.length && !filters.experienceLevels.includes(job.experienceLevel)) return false
    if (filters.workModes.length && !filters.workModes.includes(job.workMode)) return false
    if (filters.minSalary && job.salaryMax < filters.minSalary) return false
    return true
  })
}

export const sortJobs = <T extends Job>(jobs: T[], sort: SortOption): T[] => {
  const copy = [...jobs]
  switch (sort) {
    case 'salary-high':
      return copy.sort((a, b) => b.salaryMax - a.salaryMax)
    case 'recently-updated':
      return copy.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    case 'newest':
    default:
      return copy.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
  }
}

export const defaultFilters: JobFilters = {
  query: '',
  locations: [],
  employmentTypes: [],
  experienceLevels: [],
  workModes: [],
  minSalary: null,
}

export const countActiveFilters = (filters: JobFilters): number => {
  return (
    filters.locations.length +
    filters.employmentTypes.length +
    filters.experienceLevels.length +
    filters.workModes.length +
    (filters.minSalary ? 1 : 0)
  )
}
