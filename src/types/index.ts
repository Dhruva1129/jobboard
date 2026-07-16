export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship'

export type ExperienceLevel = 'Entry' | 'Mid' | 'Senior' | 'Lead' | 'Executive'

export type WorkMode = 'Remote' | 'Hybrid' | 'Onsite'

export interface Company {
  id: string
  name: string
  logo: string
  industry: string
  size: string
  website: string
  description: string
  mission: string
}

export interface Job {
  id: string
  title: string
  companyId: string
  location: string
  workMode: WorkMode
  employmentType: EmploymentType
  experienceLevel: ExperienceLevel
  salaryMin: number
  salaryMax: number
  currency: string
  postedAt: string
  updatedAt: string
  description: string
  responsibilities: string[]
  requirements: string[]
  preferredSkills: string[]
  benefits: string[]
  techStack: string[]
  skills: string[]
  featured?: boolean
  
  // Job Trust System Fields
  trustScore?: number
  recruiterActivity?: string
  responseRate?: number
  avgResponseTime?: string
  isVerified?: boolean
}

export interface JobWithCompany extends Job {
  company: Company
}

export interface JobFilters {
  query: string
  locations: string[]
  employmentTypes: EmploymentType[]
  experienceLevels: ExperienceLevel[]
  workModes: WorkMode[]
  minSalary: number | null
}

export type SortOption = 'newest' | 'salary-high' | 'recently-updated'

export interface ApplicationFormData {
  name: string
  email: string
  phone: string
  linkedin: string
  portfolio: string
  resumeUrl: string
}
