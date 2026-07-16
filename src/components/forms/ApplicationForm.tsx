import { useState, type FormEvent } from 'react'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import type { ApplicationFormData } from '../../types'

interface ApplicationFormProps {
  onSubmit: (data: ApplicationFormData) => void
  submitting?: boolean
  submitLabel?: string
}

const emptyForm: ApplicationFormData = {
  name: '',
  email: '',
  phone: '',
  linkedin: '',
  portfolio: '',
  resumeUrl: '',
}

export const ApplicationForm = ({ onSubmit, submitting, submitLabel = 'Submit application' }: ApplicationFormProps) => {
  const [form, setForm] = useState<ApplicationFormData>(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<keyof ApplicationFormData, string>>>({})

  const update = (key: keyof ApplicationFormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const validate = (): boolean => {
    const next: Partial<Record<keyof ApplicationFormData, string>> = {}
    if (!form.name.trim()) next.name = 'Name is required'
    if (!form.email.trim()) next.email = 'Email is required'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email'
    if (!form.resumeUrl.trim()) next.resumeUrl = 'A resume link is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input id="name" label="Full name" placeholder="Jane Cooper" value={form.name} onChange={update('name')} error={errors.name} required />
      <Input id="email" type="email" label="Email" placeholder="jane@email.com" value={form.email} onChange={update('email')} error={errors.email} required />
      <Input id="phone" type="tel" label="Phone (optional)" placeholder="+1 (555) 000-0000" value={form.phone} onChange={update('phone')} />
      <Input id="linkedin" label="LinkedIn (optional)" placeholder="linkedin.com/in/janecooper" value={form.linkedin} onChange={update('linkedin')} />
      <Input id="portfolio" label="Portfolio (optional)" placeholder="janecooper.com" value={form.portfolio} onChange={update('portfolio')} />
      <Input id="resumeUrl" label="Resume link" placeholder="Link to your resume (Drive, Dropbox, etc.)" value={form.resumeUrl} onChange={update('resumeUrl')} error={errors.resumeUrl} required />

      <Button type="submit" className="mt-2 w-full" disabled={submitting}>
        {submitting ? 'Submitting…' : submitLabel}
      </Button>
      <p className="text-center text-xs text-text-secondary">
        Your information is stored locally in this browser for demo purposes only.
      </p>
    </form>
  )
}
