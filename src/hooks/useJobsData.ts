import { useMemo } from 'react'
import { jobs } from '../data/jobs'
import { getCompanyById } from '../data/companies'
import type { JobFilters, JobWithCompany, SortOption } from '../types'
import { filterJobs, searchJobs, sortJobs } from '../utils/jobFilters'

export const allJobsWithCompany: JobWithCompany[] = jobs
  .map((job) => {
    const company = getCompanyById(job.companyId)
    return company ? { ...job, company } : null
  })
  .filter((j): j is JobWithCompany => j !== null)

export const useFilteredJobs = (filters: JobFilters, sort: SortOption): JobWithCompany[] => {
  return useMemo(() => {
    let result = searchJobs(allJobsWithCompany, filters.query)
    result = filterJobs(result, filters)
    result = sortJobs(result, sort)
    return result
  }, [filters, sort])
}

export const useRelatedJobs = (jobId: string, companyId: string, limit = 3): JobWithCompany[] => {
  return useMemo(() => {
    return allJobsWithCompany
      .filter((j) => j.id !== jobId && (j.companyId === companyId || j.skills.some((s) =>
        allJobsWithCompany.find((cur) => cur.id === jobId)?.skills.includes(s)
      )))
      .slice(0, limit)
  }, [jobId, companyId, limit])
}
