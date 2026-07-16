import { Briefcase, Sparkles } from 'lucide-react'
import { useResume } from '../contexts/ResumeContext'
import { allJobsWithCompany } from '../hooks/useJobsData'
import { JobCard } from '../components/cards/JobCard'
import { EmptyState } from '../components/ui/EmptyState'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export const RecommendedJobsPage = () => {
  const { profile } = useResume()

  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')
  
  const recommendedJobs = profile.hasUploadedResume 
    ? allJobsWithCompany.filter(job => {
        const matchingSkills = job.techStack.filter(tech => 
          profile.skills.some(s => normalize(s) === normalize(tech))
        )
        return (matchingSkills.length / Math.max(job.techStack.length, 1)) >= 0.5
      })
    : []

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-accent" /> Recommended Jobs
        </h1>
        <p className="text-[15px] text-text-secondary">Jobs tailored for you based on your extracted resume skills.</p>
      </div>

      {!profile.hasUploadedResume ? (
        <EmptyState
          icon={Briefcase}
          title="No resume uploaded"
          description="Upload your resume to see personalized job recommendations."
          action={
            <Link to="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          }
        />
      ) : recommendedJobs.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommendedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Briefcase}
          title="No recommendations yet"
          description="We couldn't find jobs that strongly match your current skills."
          action={
            <Link to="/jobs">
              <Button>Browse all jobs</Button>
            </Link>
          }
        />
      )}
    </div>
  )
}
