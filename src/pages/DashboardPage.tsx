import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, Clock, CheckCircle, Users, Activity, ChevronDown, Sparkles } from 'lucide-react'
import { getApplications } from '../services/storage'
import { useResume } from '../contexts/ResumeContext'
import { allJobsWithCompany } from '../hooks/useJobsData'
import { EmptyState } from '../components/ui/EmptyState'
import { Button } from '../components/ui/Button'
import { formatRelativeDate } from '../utils/format'
import { CompanyLogo } from '../components/ui/CompanyLogo'
import { ApplicationTracker } from '../components/ui/ApplicationTracker'
import { ResumeUploader } from '../components/ui/ResumeUploader'
import { JobCard } from '../components/cards/JobCard'

export const DashboardPage = () => {
  const [expandedAppId, setExpandedAppId] = useState<string | null>(null)
  const rawApplications = getApplications()
  // Filter out applications for jobs that might have been removed from the data
  const applications = rawApplications.filter(app => 
    allJobsWithCompany.some(job => job.id === app.jobId)
  )
  
  const { profile } = useResume()

  // Recommended Jobs based on extracted skills
  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')
  const recommendedJobs = profile.hasUploadedResume 
    ? allJobsWithCompany.filter(job => {
        const matchingSkills = job.techStack.filter(tech => 
          profile.skills.some(s => normalize(s) === normalize(tech))
        )
        return (matchingSkills.length / Math.max(job.techStack.length, 1)) >= 0.5
      }).slice(0, 3)
    : []

  const stats = [
    { label: 'Total Applied', value: applications.length, icon: <Briefcase className="h-5 w-5 text-accent" /> },
    { label: 'Interviews', value: applications.filter(a => a.status === 'Interview Scheduled').length, icon: <Users className="h-5 w-5 text-purple-600" /> },
    { label: 'Offers', value: applications.filter(a => a.status === 'Offer').length, icon: <CheckCircle className="h-5 w-5 text-success" /> },
    { label: 'Active', value: applications.filter(a => ['Applied', 'ATS Screening', 'Recruiter Review', 'Hiring Manager Review'].includes(a.status)).length, icon: <Activity className="h-5 w-5 text-orange-500" /> },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Applied': return 'bg-blue-50 text-blue-700 ring-blue-600/20'
      case 'ATS Screening': 
      case 'Recruiter Review': 
      case 'Hiring Manager Review': return 'bg-orange-50 text-orange-700 ring-orange-600/20'
      case 'Interview Scheduled': return 'bg-purple-50 text-purple-700 ring-purple-600/20'
      case 'Offer': return 'bg-green-50 text-green-700 ring-green-600/20'
      case 'Rejected': return 'bg-red-50 text-red-700 ring-red-600/20'
      default: return 'bg-gray-50 text-gray-700 ring-gray-600/20'
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Applicant Dashboard</h1>
          <p className="mt-2 text-[15px] text-text-secondary">Track and manage your job applications.</p>
        </div>
        <Link to="/jobs">
          <Button variant="secondary">Find more jobs</Button>
        </Link>
      </div>

      {applications.length > 0 ? (
        <>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map(stat => (
              <div key={stat.label} className="flex flex-col rounded-2xl border border-border bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-premium hover:-translate-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium text-text-secondary">{stat.label}</span>
                  {stat.icon}
                </div>
                <span className="mt-3 text-3xl font-bold text-text-primary">{stat.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
            <div className="flex flex-col gap-6">
              <h2 className="text-lg font-semibold text-text-primary">Your Applications</h2>
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <ul className="divide-y divide-border">
                  {applications.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()).map(app => {
                    const job = allJobsWithCompany.find(j => j.id === app.jobId)
                    if (!job) return null

                    return (
                      <li key={`${app.jobId}-${app.submittedAt}`} className="flex flex-col border-b border-border last:border-0">
                        <div className="flex items-center justify-between px-6 py-5 transition-colors duration-200 hover:bg-bg-secondary/50">
                      <div className="flex items-center gap-4">
                        <CompanyLogo name={job.company.name} letter={job.company.logo} size="sm" />
                      <div>
                        <Link to={`/jobs/${job.id}`} className="text-[15px] font-semibold text-text-primary hover:text-accent transition-colors">
                          {job.title}
                        </Link>
                        <p className="mt-0.5 text-sm text-text-secondary">{job.company.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="hidden sm:flex items-center gap-1.5 text-sm text-text-secondary">
                        <Clock className="h-4 w-4" />
                        Applied {formatRelativeDate(app.submittedAt)}
                      </div>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                      <div className="flex flex-col gap-2 min-w-[120px]">
                        <Button 
                          variant="secondary" 
                          className="px-3 py-1.5 text-xs h-auto border-border bg-white hover:bg-bg-secondary flex items-center justify-between gap-1.5 w-full"
                          onClick={() => setExpandedAppId(expandedAppId === app.jobId ? null : app.jobId)}
                        >
                          Track Status <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${expandedAppId === app.jobId ? 'rotate-180' : ''}`} />
                        </Button>
                        <Link to={`/jobs/${job.id}`} className="w-full">
                          <Button 
                            variant="primary" 
                            className="px-3 py-1.5 text-xs h-auto shadow-sm w-full"
                          >
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  {expandedAppId === app.jobId && (
                    <div className="bg-bg-secondary/30 px-6 py-6 border-t border-border/50">
                      <div className="max-w-2xl">
                        <h3 className="text-sm font-semibold text-text-primary mb-4">Application Timeline</h3>
                        <ApplicationTracker timeline={app.timeline || []} currentStatus={app.status} />
                      </div>
                    </div>
                  )}
                </li>
                )
              })}
            </ul>
          </div>
          </div>
          
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" /> Resume & AI Matching
              </h2>
              <ResumeUploader />
            </div>

            {profile.hasUploadedResume && recommendedJobs.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-text-primary mb-4">Recommended for you</h2>
                <div className="flex flex-col gap-4">
                  {recommendedJobs.map(job => (
                    <JobCard key={job.id} job={job} layout="list" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        </>
      ) : (
        <div className="mt-12">
          <EmptyState
            icon={Briefcase}
            title="No applications yet"
            description="Start applying to jobs and track your progress here."
            action={
              <Link to="/jobs">
                <Button>Browse jobs</Button>
              </Link>
            }
          />
        </div>
      )}
    </div>
  )
}
