export interface UserProfile {
  name: string
  title: string
  yearsOfExperience: number
  skills: string[]
  projects: { name: string; tech: string[] }[]
  targetRole: string
  experienceLevel: 'Entry' | 'Mid' | 'Senior' | 'Lead' | 'Executive'
}

export const mockUser: UserProfile = {
  name: 'Alex Developer',
  title: 'Frontend Engineer',
  yearsOfExperience: 3,
  targetRole: 'Senior Frontend Engineer',
  experienceLevel: 'Mid',
  skills: [
    'JavaScript',
    'TypeScript',
    'React',
    'HTML',
    'CSS',
    'Tailwind CSS',
    'Git',
    'Node.js',
    'REST APIs'
  ],
  projects: [
    { name: 'E-commerce Dashboard', tech: ['React', 'TypeScript', 'Tailwind CSS'] },
    { name: 'Portfolio Site', tech: ['Next.js', 'React'] }
  ]
}
