import type { EmploymentType, ExperienceLevel, WorkMode, SortOption } from '../types'

export const EMPLOYMENT_TYPES: EmploymentType[] = ['Full-time', 'Part-time', 'Contract', 'Internship']

export const EXPERIENCE_LEVELS: ExperienceLevel[] = ['Entry', 'Mid', 'Senior', 'Lead', 'Executive']

export const WORK_MODES: WorkMode[] = ['Remote', 'Hybrid', 'Onsite']

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'salary-high', label: 'Highest Salary' },
  { value: 'recently-updated', label: 'Recently Updated' },
]

export const SALARY_FLOORS = [
  { value: 0, label: 'Any salary' },
  { value: 100000, label: '$100k+' },
  { value: 150000, label: '$150k+' },
  { value: 200000, label: '$200k+' },
]

export const NAV_LINKS = [
  { to: '/jobs', label: 'Jobs' },
  { to: '/companies', label: 'Companies' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/about', label: 'About' },
]

export const STORAGE_KEYS = {
  savedJobs: 'pathway:saved-jobs',
  applications: 'pathway:applications',
  recentSearches: 'pathway:recent-searches',
  userProfile: 'pathway:user-profile',
} as const
