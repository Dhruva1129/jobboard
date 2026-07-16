import { useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { Modal } from './Modal'
import { ApplicationForm } from '../forms/ApplicationForm'
import { Button } from '../ui/Button'
import type { ApplicationFormData, JobWithCompany } from '../../types'
import { saveApplication } from '../../services/storage'
import { useToast } from '../../contexts/ToastContext'
import { useResume } from '../../contexts/ResumeContext'
import { Sparkles, Loader2, XCircle } from 'lucide-react'

interface ApplyModalProps {
  open: boolean
  onClose: () => void
  job: JobWithCompany
}

export const ApplyModal = ({ open, onClose, job }: ApplyModalProps) => {
  const [step, setStep] = useState<'form' | 'analyzing' | 'feedback' | 'submitted'>('form')
  const [formData, setFormData] = useState<ApplicationFormData | null>(null)
  const { showToast } = useToast()
  const { profile } = useResume()

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setStep('form')
      setFormData(null)
    }, 200)
  }

  const handleFormSubmit = (data: ApplicationFormData) => {
    setFormData(data)
    setStep('analyzing')
    setTimeout(() => {
      setStep('feedback')
    }, 1500)
  }

  const handleFinalSubmit = () => {
    if (!formData) return
    saveApplication({ ...formData, jobId: job.id, submittedAt: new Date().toISOString() })
    setStep('submitted')
    showToast(`Application sent to ${job.company.name}`)
  }

  const handleDirectSubmit = (data: ApplicationFormData) => {
    saveApplication({ ...data, jobId: job.id, submittedAt: new Date().toISOString() })
    setStep('submitted')
    showToast(`Application sent to ${job.company.name}`)
  }

  const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '')
  const missingSkills = job.techStack.filter(tech => 
    !profile.skills.some(s => normalize(s) === normalize(tech))
  )
  const atsScore = Math.max(40, Math.round(((job.techStack.length - missingSkills.length) / Math.max(job.techStack.length, 1)) * 100))

  return (
    <Modal open={open} onClose={handleClose} title={step === 'submitted' ? 'Application submitted' : step === 'analyzing' || step === 'feedback' ? 'AI Resume Coach' : `Apply to ${job.title}`}>
      {step === 'submitted' ? (
        <div className="flex flex-col items-center py-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2 className="h-6 w-6 text-success" />
          </div>
          <h3 className="mt-4 text-[15px] font-semibold text-text-primary">You’re all set</h3>
          <p className="mt-1.5 max-w-xs text-sm text-text-secondary">
            Your application for {job.title} at {job.company.name} has been submitted.
          </p>
          <Button className="mt-6" onClick={handleClose}>
            Done
          </Button>
        </div>
      ) : step === 'analyzing' ? (
        <div className="flex flex-col items-center py-10 text-center">
          <Loader2 className="h-10 w-10 text-accent animate-spin" />
          <h3 className="mt-5 text-[15px] font-semibold text-text-primary flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" /> Analyzing your resume...
          </h3>
          <p className="mt-2 max-w-xs text-sm text-text-secondary">
            Our AI is comparing your profile against the requirements for {job.title}.
          </p>
        </div>
      ) : step === 'feedback' ? (
        <div className="flex flex-col">
          <div className={`rounded-xl border p-5 ${atsScore >= 75 ? 'bg-green-50/50 border-green-200' : 'bg-orange-50/50 border-orange-200'}`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-text-primary">ATS Compatibility Score</span>
              <span className={`text-xl font-bold ${atsScore >= 75 ? 'text-success' : 'text-orange-600'}`}>{atsScore}%</span>
            </div>
            
            {missingSkills.length > 0 && (
              <div className="mt-5">
                <span className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-2 block">Missing Keywords</span>
                <div className="flex flex-wrap gap-1.5">
                  {missingSkills.map(s => (
                    <span key={s} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white text-error text-xs font-medium border border-error/20 shadow-sm">
                      <XCircle className="h-3 w-3" /> {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-5">
              <span className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-1 block">AI Recommendation</span>
              <p className="text-sm text-text-secondary">
                {atsScore >= 75 
                  ? "Your resume is a strong match! Consider highlighting your leadership experience."
                  : `Add measurable achievements related to ${missingSkills[0] || 'the core skills'} to improve your chances.`}
              </p>
            </div>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setStep('form')}>
              Improve Resume
            </Button>
            <Button className="flex-1" onClick={handleFinalSubmit}>
              Submit Anyway
            </Button>
          </div>
        </div>
      ) : (
        <>
          <p className="mb-5 text-sm text-text-secondary">
            Applying to <span className="font-medium text-text-primary">{job.title}</span> at{' '}
            <span className="font-medium text-text-primary">{job.company.name}</span>
          </p>
          <ApplicationForm 
            onSubmit={profile.hasUploadedResume ? handleFormSubmit : handleDirectSubmit} 
            submitLabel={profile.hasUploadedResume ? "Analyze with AI Coach" : "Submit Application"} 
          />
        </>
      )}
    </Modal>
  )
}
