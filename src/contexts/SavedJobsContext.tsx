import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { getSavedJobIds, setSavedJobIds } from '../services/storage'

interface SavedJobsContextValue {
  savedJobIds: string[]
  isSaved: (jobId: string) => boolean
  toggleSaved: (jobId: string) => void
  removeSaved: (jobId: string) => void
}

const SavedJobsContext = createContext<SavedJobsContextValue | undefined>(undefined)

export const SavedJobsProvider = ({ children }: { children: ReactNode }) => {
  const [savedJobIds, setSavedIds] = useState<string[]>(() => getSavedJobIds())

  const persist = useCallback((ids: string[]) => {
    setSavedIds(ids)
    setSavedJobIds(ids)
  }, [])

  const isSaved = useCallback((jobId: string) => savedJobIds.includes(jobId), [savedJobIds])

  const toggleSaved = useCallback(
    (jobId: string) => {
      persist(
        savedJobIds.includes(jobId)
          ? savedJobIds.filter((id) => id !== jobId)
          : [...savedJobIds, jobId]
      )
    },
    [savedJobIds, persist]
  )

  const removeSaved = useCallback(
    (jobId: string) => {
      persist(savedJobIds.filter((id) => id !== jobId))
    },
    [savedJobIds, persist]
  )

  const value = useMemo(
    () => ({ savedJobIds, isSaved, toggleSaved, removeSaved }),
    [savedJobIds, isSaved, toggleSaved, removeSaved]
  )

  return <SavedJobsContext.Provider value={value}>{children}</SavedJobsContext.Provider>
}

export const useSavedJobs = (): SavedJobsContextValue => {
  const ctx = useContext(SavedJobsContext)
  if (!ctx) throw new Error('useSavedJobs must be used within SavedJobsProvider')
  return ctx
}
