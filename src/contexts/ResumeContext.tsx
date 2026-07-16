import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { getUserProfile, setUserProfile } from '../services/storage'
import type { UserProfile } from '../services/storage'

interface ResumeContextType {
  profile: UserProfile
  uploadResume: (file: File, extractedSkills: string[]) => void
  removeResume: () => void
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfileState] = useState<UserProfile>(getUserProfile())

  const uploadResume = (file: File, extractedSkills: string[]) => {
    const newProfile = {
      hasUploadedResume: true,
      resumeName: file.name,
      skills: extractedSkills,
    }
    setProfileState(newProfile)
    setUserProfile(newProfile)
  }

  const removeResume = () => {
    const newProfile = {
      hasUploadedResume: false,
      skills: [],
    }
    setProfileState(newProfile)
    setUserProfile(newProfile)
  }

  return (
    <ResumeContext.Provider value={{ profile, uploadResume, removeResume }}>
      {children}
    </ResumeContext.Provider>
  )
}

export const useResume = () => {
  const context = useContext(ResumeContext)
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider')
  }
  return context
}
