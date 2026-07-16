import { CheckCircle2, Clock, Circle } from 'lucide-react'
import type { ApplicationTimelineEvent, ApplicationStatus } from '../../services/storage'
import { formatRelativeDate } from '../../utils/format'

const STAGES: ApplicationStatus[] = [
  'Applied',
  'ATS Screening',
  'Recruiter Review',
  'Hiring Manager Review',
  'Interview Scheduled',
  'Offer'
]

interface ApplicationTrackerProps {
  timeline: ApplicationTimelineEvent[]
  currentStatus: ApplicationStatus
}

export const ApplicationTracker = ({ timeline, currentStatus }: ApplicationTrackerProps) => {
  const isRejected = currentStatus === 'Rejected'
  // If rejected, we find the index of the stage right before rejection based on timeline length
  // but let's just compute current stage index by looking at the last successful stage
  let currentStageIndex = STAGES.indexOf(currentStatus)
  if (isRejected) {
    const lastStageBeforeReject = timeline[timeline.length - 2]?.stage
    currentStageIndex = STAGES.indexOf(lastStageBeforeReject) + 1
  }
  
  return (
    <div className="py-2">
      <div className="relative">
        <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-border" />
        <div className="flex flex-col gap-5">
          {STAGES.map((stage, index) => {
            const event = timeline.find(e => e.stage === stage)
            // It is completed if there's an event, or if it's before the current stage
            const isCompleted = event !== undefined || (!isRejected && index < currentStageIndex)
            const isCurrent = !isRejected && (stage === currentStatus || (currentStatus === 'Applied' && index === 0))
            
            // Do not show upcoming stages if rejected
            if (isRejected && index > currentStageIndex) return null

            return (
              <div key={stage} className="relative flex gap-4">
                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
                  {isCompleted && !isCurrent ? (
                    <CheckCircle2 className="h-6 w-6 text-success bg-white rounded-full" />
                  ) : isCurrent ? (
                    <div className="h-4 w-4 rounded-full border-4 border-accent bg-white shadow-sm ring-4 ring-accent/20" />
                  ) : (
                    <Circle className="h-5 w-5 text-border bg-white" />
                  )}
                </div>
                <div className="flex flex-col pt-1">
                  <span className={`text-sm font-semibold ${isCurrent ? 'text-accent' : isCompleted ? 'text-text-primary' : 'text-text-secondary'}`}>
                    {stage}
                  </span>
                  {event && (
                    <span className="text-xs text-text-secondary mt-0.5">
                      {formatRelativeDate(event.date)}
                    </span>
                  )}
                  {event?.notes && (
                    <p className="mt-2 text-xs text-text-secondary bg-bg-secondary p-2.5 rounded border border-border/50">
                      {event.notes}
                    </p>
                  )}
                  {isCurrent && !isRejected && (
                    <span className="mt-2 text-xs font-medium text-accent bg-accent-subtle/50 px-2 py-1 rounded inline-flex items-center gap-1 w-fit">
                      <Clock className="h-3 w-3" /> Estimated review: 2-3 days
                    </span>
                  )}
                </div>
              </div>
            )
          })}
          
          {isRejected && (
            <div className="relative flex gap-4">
              <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white">
                <div className="h-4 w-4 rounded-full border-4 border-error bg-white shadow-sm ring-4 ring-error/20" />
              </div>
              <div className="flex flex-col pt-1">
                <span className="text-sm font-semibold text-error">
                  Rejected
                </span>
                <span className="text-xs text-text-secondary mt-0.5">
                  {timeline.find(e => e.stage === 'Rejected')?.date ? formatRelativeDate(timeline.find(e => e.stage === 'Rejected')!.date) : 'Recently'}
                </span>
                {timeline.find(e => e.stage === 'Rejected')?.notes && (
                  <p className="mt-2 text-xs text-error bg-error/10 p-2.5 rounded border border-error/20">
                    {timeline.find(e => e.stage === 'Rejected')!.notes}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
