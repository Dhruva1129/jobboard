import { Link } from 'react-router-dom'
import { Bookmark } from 'lucide-react'
import { JobCard } from '../components/cards/JobCard'
import { EmptyState } from '../components/ui/EmptyState'
import { Button } from '../components/ui/Button'
import { useSavedJobs } from '../contexts/SavedJobsContext'
import { allJobsWithCompany } from '../hooks/useJobsData'

export const SavedJobsPage = () => {
  const { savedJobIds } = useSavedJobs()
  const savedJobs = allJobsWithCompany.filter((j) => savedJobIds.includes(j.id))

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-text-primary">Saved jobs</h1>
      <p className="mt-1.5 text-sm text-text-secondary">
        {savedJobs.length > 0 ? `${savedJobs.length} ${savedJobs.length === 1 ? 'job' : 'jobs'} saved for later` : 'Jobs you save will appear here.'}
      </p>

      {savedJobs.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {savedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="mt-8">
          <EmptyState
            icon={Bookmark}
            title="No saved jobs yet"
            description="Bookmark roles you\u2019re interested in and they\u2019ll show up here so you can find them again quickly."
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
