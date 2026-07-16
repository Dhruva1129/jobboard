import { STORAGE_KEYS } from '../constants'
import type { ApplicationFormData } from '../types'

export interface UserProfile {
  hasUploadedResume: boolean
  resumeName?: string
  skills: string[]
}

const defaultProfile: UserProfile = {
  hasUploadedResume: false,
  skills: [],
}

const safeGet = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

const safeSet = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // localStorage unavailable — fail silently, app remains usable
  }
}

export const getSavedJobIds = (): string[] => safeGet<string[]>(STORAGE_KEYS.savedJobs, [])

export const setSavedJobIds = (ids: string[]): void => safeSet(STORAGE_KEYS.savedJobs, ids)

export type ApplicationStatus = 'Applied' | 'ATS Screening' | 'Recruiter Review' | 'Hiring Manager Review' | 'Interview Scheduled' | 'Offer' | 'Rejected'

export interface ApplicationTimelineEvent {
  stage: ApplicationStatus
  date: string
  notes?: string
}

export interface StoredApplication extends ApplicationFormData {
  jobId: string
  submittedAt: string
  status: ApplicationStatus
  timeline: ApplicationTimelineEvent[]
}

export const getApplications = (): StoredApplication[] => {
  const apps = safeGet<StoredApplication[]>(STORAGE_KEYS.applications, [])
  if (apps.length === 0) {
    // Inject some dummy data so the dashboard is populated
    const dummyApps: StoredApplication[] = [
      {
        jobId: '1',
        submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        status: 'Interview Scheduled',
        timeline: [
          { stage: 'Applied', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString() },
          { stage: 'ATS Screening', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString() },
          { stage: 'Recruiter Review', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString() },
          { stage: 'Hiring Manager Review', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2.5).toISOString() },
          { stage: 'Interview Scheduled', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), notes: 'Virtual Onsite scheduled for next Tuesday.' }
        ],
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '',
        linkedin: '',
        portfolio: '',
        resumeUrl: ''
      },
      {
        jobId: '2',
        submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
        status: 'Recruiter Review',
        timeline: [
          { stage: 'Applied', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString() },
          { stage: 'ATS Screening', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4.5).toISOString() },
          { stage: 'Recruiter Review', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString() }
        ],
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '',
        linkedin: '',
        portfolio: '',
        resumeUrl: ''
      },
      {
        jobId: '3',
        submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
        status: 'Rejected',
        timeline: [
          { stage: 'Applied', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString() },
          { stage: 'ATS Screening', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 13).toISOString() },
          { stage: 'Rejected', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), notes: 'Decided to move forward with other candidates.' }
        ],
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '',
        linkedin: '',
        portfolio: '',
        resumeUrl: ''
      }
    ]
    safeSet(STORAGE_KEYS.applications, dummyApps)
    return dummyApps
  }
  return apps
}

export const saveApplication = (application: Omit<StoredApplication, 'status' | 'timeline'>): void => {
  const all = getApplications()
  
  const newApp: StoredApplication = {
    ...application,
    status: 'Applied',
    timeline: [
      { stage: 'Applied', date: new Date().toISOString(), notes: 'Application successfully submitted.' }
    ]
  }
  
  safeSet(STORAGE_KEYS.applications, [...all, newApp])
}

export const hasAppliedToJob = (jobId: string): boolean =>
  getApplications().some((app) => app.jobId === jobId)

export const getRecentSearches = (): string[] => safeGet<string[]>(STORAGE_KEYS.recentSearches, [])

export const addRecentSearch = (query: string): void => {
  if (!query.trim()) return
  const existing = getRecentSearches().filter((q) => q.toLowerCase() !== query.toLowerCase())
  const updated = [query, ...existing].slice(0, 5)
  safeSet(STORAGE_KEYS.recentSearches, updated)
}

export const getUserProfile = (): UserProfile => safeGet<UserProfile>(STORAGE_KEYS.userProfile, defaultProfile)

export const setUserProfile = (profile: UserProfile): void => safeSet(STORAGE_KEYS.userProfile, profile)
