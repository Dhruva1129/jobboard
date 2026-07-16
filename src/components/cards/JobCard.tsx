import { Bookmark, MapPin, Clock, ArrowRight, Briefcase, Monitor, Building2, GraduationCap, Flame, Sparkles } from 'lucide-react'
import type { JobWithCompany } from '../../types'
import { CompanyLogo } from '../ui/CompanyLogo'
import { Badge } from '../ui/Badge'
import { formatSalary, formatRelativeDate } from '../../utils/format'
import { useSavedJobs } from '../../contexts/SavedJobsContext'
import { useToast } from '../../contexts/ToastContext'

import { SpotlightCard } from '../ui/SpotlightCard'

interface JobCardProps {
  job: JobWithCompany
  layout?: 'grid' | 'list'
}

const isNew = (dateStr: string) => {
  const posted = new Date(dateStr)
  const now = new Date()
  const diffDays = (now.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24)
  return diffDays <= 3
}

export const JobCard = ({ job, layout = 'grid' }: JobCardProps) => {
  const { isSaved, toggleSaved } = useSavedJobs()
  const { showToast } = useToast()
  const saved = isSaved(job.id)
  const jobIsNew = isNew(job.postedAt)

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleSaved(job.id)
    showToast(saved ? 'Removed from saved jobs' : 'Job saved')
  }

  return (
    <SpotlightCard
      to={`/jobs/${job.id}`}
      className={`p-7 ${layout === 'list' ? 'flex-col sm:flex-row sm:items-center sm:gap-6' : 'flex-col'}`}
    >
      <div className={`flex items-start justify-between w-full ${layout === 'list' ? 'sm:w-auto sm:flex-col sm:gap-4 shrink-0' : ''}`}>
        <div className="flex items-start gap-4">
          <div className="relative">
            <CompanyLogo name={job.company.name} letter={job.company.logo} website={job.company.website} size="md" />
          </div>
          {(job.featured || jobIsNew) && (
            <div className={`flex flex-wrap gap-1.5 ${layout === 'list' ? 'sm:hidden' : ''}`}>
              {job.featured && (
                <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                  <Flame className="h-2.5 w-2.5" /> Featured
                </span>
              )}
              {jobIsNew && (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                  <Sparkles className="h-2.5 w-2.5" /> New
                </span>
              )}
            </div>
          )}
        </div>
        
        <button
          onClick={handleSave}
          aria-label={saved ? 'Remove from saved jobs' : 'Save job'}
          aria-pressed={saved}
          className={`shrink-0 z-20 rounded-full p-2 transition-all duration-300 hover:bg-bg-secondary hover:scale-110 ${
            saved ? 'text-accent opacity-100' : 'text-text-secondary opacity-0 group-hover:opacity-100'
          } ${layout === 'list' ? 'sm:absolute sm:right-6 sm:top-6' : ''}`}
        >
          <Bookmark className={`h-[18px] w-[18px] ${saved ? 'fill-accent' : ''}`} />
        </button>
      </div>

      <div className={`flex flex-col min-w-0 ${layout === 'list' ? 'sm:flex-1' : 'mt-5'}`}>
        <h3 className="truncate text-lg font-bold tracking-tight text-text-primary transition-colors duration-200 group-hover:text-accent">
          {job.title}
        </h3>
        <div className="mt-1.5 flex items-center gap-2.5 text-[14px] text-text-secondary">
          <span className="font-medium text-text-primary">{job.company.name}</span>
          <span className="h-1 w-1 rounded-full bg-border"></span>
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {job.location}
          </span>
        </div>

        {/* Description snippet */}
        <p className="mt-3 text-[13px] leading-relaxed text-text-secondary line-clamp-2">
          {job.description}
        </p>

        {/* Tech stack tags */}
        {job.techStack.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {job.techStack.slice(0, 4).map(tech => (
              <span key={tech} className="rounded-md bg-accent-subtle px-2 py-0.5 text-[11px] font-medium text-accent">
                {tech}
              </span>
            ))}
            {job.techStack.length > 4 && (
              <span className="rounded-md bg-bg-secondary px-2 py-0.5 text-[11px] font-medium text-text-secondary">
                +{job.techStack.length - 4}
              </span>
            )}
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="mr-3 text-[15px] font-semibold text-text-primary">
            {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
          </span>
          <Badge variant={job.workMode === 'Remote' ? 'accent' : 'default'}>
            {job.workMode === 'Remote' ? <Monitor className="h-3 w-3" /> : <Building2 className="h-3 w-3" />}
            {job.workMode}
          </Badge>
          <Badge>
            <Briefcase className="h-3 w-3" />
            {job.employmentType}
          </Badge>
          <Badge>
            <GraduationCap className="h-3 w-3" />
            {job.experienceLevel}
          </Badge>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4">
          <span className="flex items-center gap-1.5 text-[13px] font-medium text-text-secondary">
            <Clock className="h-3.5 w-3.5" />
            {formatRelativeDate(job.postedAt)}
          </span>
          
          <span className="flex items-center gap-1 text-[14px] font-semibold text-accent opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-x-1">
            Apply <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </SpotlightCard>
  )
}
