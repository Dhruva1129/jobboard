import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Briefcase, Menu, X, Bookmark, CheckCircle2 } from 'lucide-react'
import { NAV_LINKS } from '../../constants'
import { Button } from '../ui/Button'
import { useSavedJobs } from '../../contexts/SavedJobsContext'
import { useResume } from '../../contexts/ResumeContext'
import { Modal } from '../modals/Modal'
import { ResumeUploader } from '../ui/ResumeUploader'

export const Navbar = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { savedJobIds } = useSavedJobs()
  const { profile, removeResume } = useResume()

  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 h-20 pointer-events-none bg-white/70 backdrop-blur-md border-b border-border/50 transition-all duration-300">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Logo */}
        <div className="pointer-events-auto flex items-center">
          <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white shadow-md transition-all duration-300 group-hover:shadow-glow group-hover:scale-105">
              <Briefcase className="h-4 w-4" strokeWidth={2.25} />
            </div>
            <span className="text-[16px] font-bold tracking-tight text-text-primary">Pathway</span>
          </Link>
        </div>

        {/* Center: Floating Pill */}
        <div className="pointer-events-auto absolute left-1/2 -translate-x-1/2 rounded-full border border-border/40 bg-white/80 px-2 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.06)] backdrop-blur-xl hidden md:block">
          <nav className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative rounded-full px-4 py-1.5 text-[14px] font-medium transition-all duration-300 ${
                    isActive ? 'bg-accent text-white shadow-md' : 'text-text-secondary hover:bg-accent-subtle hover:text-accent'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {profile.hasUploadedResume && (
              <NavLink
                to="/recommended"
                className={({ isActive }) =>
                  `relative rounded-full px-4 py-1.5 text-[14px] font-medium transition-all duration-300 flex items-center gap-1.5 ${
                    isActive ? 'bg-accent text-white shadow-md' : 'text-text-secondary hover:bg-accent-subtle hover:text-accent'
                  }`
                }
              >
                Recommended
              </NavLink>
            )}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="pointer-events-auto flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <Link to="/saved" className="relative flex h-9 w-9 items-center justify-center rounded-full text-text-secondary transition-all duration-300 hover:bg-accent-subtle hover:text-accent" aria-label="Saved jobs">
              <Bookmark className="h-[18px] w-[18px]" />
              {savedJobIds.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white shadow-sm">
                  {savedJobIds.length}
                </span>
              )}
            </Link>
            {!profile.hasUploadedResume ? (
              <Button size="sm" variant="secondary" className="rounded-full shadow-sm" onClick={() => setIsUploadOpen(true)}>
                Upload Resume
              </Button>
            ) : (
              <div className="flex items-center gap-1 pl-3 pr-1.5 py-1 rounded-full bg-green-50 text-success text-xs font-semibold border border-green-200">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span className="ml-0.5">Resume Uploaded</span>
                <button
                  onClick={() => setIsDeleteConfirmOpen(true)}
                  className="ml-1 flex h-5 w-5 items-center justify-center rounded-full hover:bg-green-200 transition-colors text-success/70 hover:text-success"
                  aria-label="Remove resume"
                >
                  <X className="h-3 w-3" strokeWidth={2.5} />
                </button>
              </div>
            )}
            <Button size="sm" className="rounded-full shadow-sm hover:shadow-md bg-accent border-none hover:shadow-glow" onClick={() => navigate('/jobs')}>
              Find jobs
            </Button>
          </div>

          <button
            className="flex h-9 w-9 items-center justify-center rounded-full text-text-primary hover:bg-accent-subtle md:hidden pointer-events-auto"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {open && (
        <div className="absolute left-4 right-4 top-20 mt-2 rounded-2xl border border-border/40 bg-white/95 p-3 shadow-lg backdrop-blur-xl md:hidden pointer-events-auto">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive ? 'bg-accent text-white' : 'text-text-secondary hover:bg-accent-subtle hover:text-accent'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/saved"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-text-secondary hover:bg-accent-subtle hover:text-accent"
            >
              Saved jobs
              {savedJobIds.length > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white">
                  {savedJobIds.length}
                </span>
              )}
            </NavLink>
            <Button size="md" className="mt-2 w-full rounded-xl bg-accent border-none" onClick={() => { setOpen(false); navigate('/jobs') }}>
              Find jobs
            </Button>
          </nav>
        </div>
      )}

      <Modal open={isUploadOpen} onClose={() => setIsUploadOpen(false)} title="Upload Resume">
        <div className="p-4 sm:p-6 pb-8">
          <ResumeUploader onComplete={() => setIsUploadOpen(false)} />
        </div>
      </Modal>

      <Modal open={isDeleteConfirmOpen} onClose={() => setIsDeleteConfirmOpen(false)} title="Remove Resume">
        <div className="p-4 sm:p-6">
          <p className="text-text-secondary mb-6 text-[15px]">
            Are you sure you want to remove your resume? All extracted skills will be erased and personalized job recommendations will be disabled.
          </p>
          <div className="flex items-center justify-end gap-3">
            <Button variant="secondary" onClick={() => setIsDeleteConfirmOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              removeResume()
              setIsDeleteConfirmOpen(false)
            }} className="bg-red-500 hover:bg-red-600 text-white shadow-sm border-none">
              Confirm Delete
            </Button>
          </div>
        </div>
      </Modal>
    </header>
  )
}
