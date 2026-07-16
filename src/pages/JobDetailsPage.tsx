import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { MapPin, Clock, Bookmark, Share2, CheckCircle2, Activity, MessageSquare, Sparkles, XCircle } from 'lucide-react'
import { CompanyLogo } from '../components/ui/CompanyLogo'
import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Breadcrumb } from '../components/layout/Breadcrumb'
import { JobCard } from '../components/cards/JobCard'
import { ApplyModal } from '../components/modals/ApplyModal'
import { allJobsWithCompany, useRelatedJobs } from '../hooks/useJobsData'
import { formatSalary, formatFullDate, formatRelativeDate } from '../utils/format'
import { useSavedJobs } from '../contexts/SavedJobsContext'
import { useToast } from '../contexts/ToastContext'
import { useResume } from '../contexts/ResumeContext'
import { hasAppliedToJob } from '../services/storage'
import { ResumeUploader } from '../components/ui/ResumeUploader'

const Section = ({ title, items }: { title: string; items: string[] }) => (
  <div>
    <h2 className="text-[15px] font-semibold text-text-primary">{title}</h2>
    <ul className="mt-3 flex flex-col gap-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-text-secondary">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-secondary" />
          {item}
        </li>
      ))}
    </ul>
  </div>
)

export const JobDetailsPage = () => {
  const { jobId } = useParams<{ jobId: string }>()
  const [applyOpen, setApplyOpen] = useState(false)
  const { isSaved, toggleSaved } = useSavedJobs()
  const { showToast } = useToast()
  const { profile } = useResume()

  const job = allJobsWithCompany.find((j) => j.id === jobId)
  const related = useRelatedJobs(job?.id ?? '', job?.companyId ?? '')

  if (!job) return <Navigate to="/404" replace />

  const saved = isSaved(job.id)
  const applied = hasAppliedToJob(job.id)

  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')
  const matchingSkills = job.techStack.filter(tech => 
    profile.skills.some(s => normalize(s) === normalize(tech))
  )
  const missingSkills = job.techStack.filter(tech => 
    !profile.skills.some(s => normalize(s) === normalize(tech))
  )
  const matchScore = Math.round((matchingSkills.length / Math.max(job.techStack.length, 1)) * 100)

  const handleShare = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      showToast('Link copied to clipboard')
    } catch {
      showToast('Could not copy link', 'error')
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb items={[{ label: 'Jobs', to: '/jobs' }, { label: job.title }]} />

      <div className="mt-6 flex flex-col gap-6 rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            <CompanyLogo name={job.company.name} letter={job.company.logo} website={job.company.website} size="lg" />
            <div>
              <h1 className="text-xl font-semibold text-text-primary sm:text-2xl">{job.title}</h1>
              <p className="mt-1 text-[15px] text-text-secondary">{job.company.name}</p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-text-secondary">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  Posted {formatRelativeDate(job.postedAt)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 gap-2 sm:flex-col">
            <Button className="flex-1 sm:flex-initial" onClick={() => setApplyOpen(true)} disabled={applied}>
              {applied ? (
                <>
                  <CheckCircle2 className="h-4 w-4" /> Applied
                </>
              ) : (
                'Apply now'
              )}
            </Button>
            <div className="flex gap-2">
              <Button variant="secondary" size="md" className="flex-1" onClick={() => { toggleSaved(job.id); showToast(saved ? 'Removed from saved jobs' : 'Job saved') }}>
                <Bookmark className={`h-4 w-4 ${saved ? 'fill-accent text-accent' : ''}`} />
                {saved ? 'Saved' : 'Save'}
              </Button>
              <Button variant="secondary" size="md" onClick={handleShare} aria-label="Share job">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-border pt-5">
          <Badge variant={job.workMode === 'Remote' ? 'accent' : 'default'}>{job.workMode}</Badge>
          <Badge>{job.employmentType}</Badge>
          <Badge>{job.experienceLevel}</Badge>
          <Badge variant="success">{formatSalary(job.salaryMin, job.salaryMax, job.currency)}</Badge>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">
        <div className="flex flex-col gap-8">
          {profile.hasUploadedResume ? (
            <div className="rounded-xl border border-border bg-accent-subtle/30 p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-[15px] font-semibold text-text-primary flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-accent" /> AI Semantic Match
                  </h2>
                  <p className="mt-1 text-sm text-text-secondary">Based on your extracted skills.</p>
                </div>
                <div className={`flex items-center justify-center h-12 w-12 rounded-full bg-white border-2 shadow-sm ${matchScore >= 80 ? 'border-success text-success' : matchScore >= 50 ? 'border-orange-500 text-orange-500' : 'border-error text-error'}`}>
                  <span className="text-[15px] font-bold">{matchScore}%</span>
                </div>
              </div>
              
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xs font-semibold text-success uppercase tracking-wider mb-2">Matching Skills</h3>
                  <ul className="flex flex-wrap gap-1.5">
                    {matchingSkills.map(s => (
                      <li key={s} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-50 text-green-700 text-xs font-medium border border-green-200">
                        <CheckCircle2 className="h-3 w-3" /> {s}
                      </li>
                    ))}
                    {matchingSkills.length === 0 && <span className="text-xs text-text-secondary">None</span>}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-error uppercase tracking-wider mb-2">Missing Skills</h3>
                  <ul className="flex flex-wrap gap-1.5">
                    {missingSkills.map(s => (
                      <li key={s} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-50 text-red-700 text-xs font-medium border border-red-200">
                        <XCircle className="h-3 w-3" /> {s}
                      </li>
                    ))}
                    {missingSkills.length === 0 && <span className="text-xs text-text-secondary">None</span>}
                  </ul>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-border/50">
                <ResumeUploader />
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 text-center">
                <h2 className="text-[15px] font-semibold text-text-primary flex items-center justify-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" /> Unlock AI Semantic Match
                </h2>
                <p className="mt-1 text-sm text-text-secondary">Upload your resume to instantly see your match score and missing skills for this role.</p>
              </div>
              <ResumeUploader />
            </div>
          )}

          <div>
            <h2 className="text-[15px] font-semibold text-text-primary">About this role</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">{job.description}</p>
          </div>

          <Section title="Responsibilities" items={job.responsibilities} />
          <Section title="Requirements" items={job.requirements} />
          <Section title="Preferred skills" items={job.preferredSkills} />
          <Section title="Benefits" items={job.benefits} />

          <div>
            <h2 className="text-[15px] font-semibold text-text-primary">Tech stack</h2>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {job.techStack.map((tech) => (
                <Badge key={tech} variant="outline">{tech}</Badge>
              ))}
            </div>
          </div>
        </div>

        <aside className="flex flex-col gap-6">
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <CompanyLogo name={job.company.name} letter={job.company.logo} website={job.company.website} />
              <div>
                <p className="text-sm font-semibold text-text-primary">{job.company.name}</p>
                <p className="text-xs text-text-secondary">{job.company.industry}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">{job.company.description}</p>
            <dl className="mt-4 space-y-2 border-t border-border pt-4 text-xs">
              <div className="flex justify-between">
                <dt className="text-text-secondary">Company size</dt>
                <dd className="font-medium text-text-primary">{job.company.size}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-text-secondary">Website</dt>
                <dd className="font-medium text-accent">{job.company.website}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-text-secondary">Job updated</dt>
                <dd className="font-medium text-text-primary">{formatFullDate(job.updatedAt)}</dd>
              </div>
            </dl>
          </div>

          {job.isVerified && (
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" /> Job Trust System
              </h3>
              <dl className="mt-4 space-y-3 text-xs">
                {job.recruiterActivity && (
                  <div className="flex justify-between items-center">
                    <dt className="text-text-secondary flex items-center gap-1.5"><Activity className="h-3.5 w-3.5"/> Recruiter</dt>
                    <dd className="font-medium text-text-primary">{job.recruiterActivity}</dd>
                  </div>
                )}
                {job.responseRate && (
                  <div className="flex justify-between items-center">
                    <dt className="text-text-secondary flex items-center gap-1.5"><MessageSquare className="h-3.5 w-3.5"/> Response rate</dt>
                    <dd className="font-medium text-text-primary">{job.responseRate}%</dd>
                  </div>
                )}
                {job.avgResponseTime && (
                  <div className="flex justify-between items-center">
                    <dt className="text-text-secondary flex items-center gap-1.5"><Clock className="h-3.5 w-3.5"/> Avg response</dt>
                    <dd className="font-medium text-text-primary">{job.avgResponseTime}</dd>
                  </div>
                )}
                <div className="mt-2 pt-3 border-t border-border flex items-center justify-between">
                  <span className="text-text-secondary font-medium">Hiring Probability</span>
                  <span className={`font-bold ${job.trustScore && job.trustScore >= 80 ? 'text-success' : 'text-orange-500'}`}>{job.trustScore}%</span>
                </div>
              </dl>
            </div>
          )}
        </aside>
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-text-primary">Related jobs</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((j) => (
              <JobCard key={j.id} job={j} />
            ))}
          </div>
        </div>
      )}

      <ApplyModal open={applyOpen} onClose={() => setApplyOpen(false)} job={job} />

      <div className="mt-8">
        <Link to="/jobs" className="text-sm font-medium text-accent transition-all duration-200 hover:text-accent-hover">
          ← Back to all jobs
        </Link>
      </div>
    </div>
  )
}
