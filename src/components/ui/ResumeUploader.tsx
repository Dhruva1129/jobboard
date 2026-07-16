import { useState, useRef } from 'react'
import { UploadCloud, FileText, Loader2, CheckCircle } from 'lucide-react'
import { useResume } from '../../contexts/ResumeContext'
import { Button } from './Button'

import * as pdfjsLib from 'pdfjs-dist'
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url'
import { ALL_KNOWN_SKILLS } from '../../constants/skills'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl

export const ResumeUploader = ({ onComplete }: { onComplete?: () => void }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const { uploadResume, profile } = useResume()

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true)
    } else if (e.type === 'dragleave') {
      setIsDragging(false)
    }
  }

  const processFile = async (file: File) => {
    setIsUploading(true)
    
    let text = ''
    try {
      if (file.name.toLowerCase().endsWith('.pdf')) {
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise
        let fullText = ''
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i)
          const content = await page.getTextContent()
          const pageTextSpaced = content.items.map((item: any) => item.str).join(' ')
          const pageTextUnspaced = content.items.map((item: any) => item.str).join('')
          fullText += pageTextSpaced + ' ' + pageTextUnspaced + ' '
        }
        text = fullText
      } else {
        text = await file.text()
      }
    } catch (e) {
      console.error('Failed to parse document', e)
    }

    const normalizedText = text.toLowerCase()
    const textWithoutSpaces = normalizedText.replace(/\s+/g, '')
    
    // Scan text for known skills
    const extractedSkills = ALL_KNOWN_SKILLS.filter(skill => {
      const normalizedSkill = skill.toLowerCase()
      // Use boundaries for short/common words on the normally spaced text
      if (['go', 'r', 'sql', 'c', 'c++', 'c#'].includes(normalizedSkill)) {
        const escaped = normalizedSkill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const regex = new RegExp(`(?:^|[^a-z0-9])${escaped}(?:[^a-z0-9]|$)`, 'i')
        return regex.test(normalizedText)
      }
      
      const normalizedSkillNoSpaces = normalizedSkill.replace(/\s+/g, '')
      return normalizedText.includes(normalizedSkill) || textWithoutSpaces.includes(normalizedSkillNoSpaces)
    })

    uploadResume(file, extractedSkills)
    setIsUploading(false)
    setIsSuccess(true)
    setTimeout(() => {
      setIsSuccess(false)
      if (onComplete) onComplete()
    }, 1500)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0])
    }
  }

  if (profile.hasUploadedResume && !isUploading && !isSuccess) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full min-w-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-subtle">
            <FileText className="h-5 w-5 text-accent" />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-semibold text-text-primary truncate">{profile.resumeName}</h4>
            <p className="text-xs text-text-secondary">{profile.skills.length} skills extracted via AI</p>
            {profile.skills.length > 0 && (
              <p className="mt-1 text-xs text-text-secondary/70 truncate" title={profile.skills.join(', ')}>
                {profile.skills.join(', ')}
              </p>
            )}
          </div>
        </div>
        <Button variant="secondary" onClick={() => fileInputRef.current?.click()} size="sm" className="shrink-0">
          Update Resume
        </Button>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleChange} 
          accept=".pdf,.doc,.docx" 
          className="hidden" 
        />
      </div>
    )
  }

  return (
    <div 
      className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors duration-200 ${
        isDragging ? 'border-accent bg-accent-subtle/30' : 'border-border hover:bg-bg-secondary/50'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => !isUploading && fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleChange} 
        accept=".pdf,.txt,.md" 
        className="hidden" 
      />
      
      {isUploading ? (
        <div className="flex flex-col items-center text-center">
          <Loader2 className="h-8 w-8 text-accent animate-spin mb-4" />
          <p className="text-sm font-semibold text-text-primary">Extracting skills via AI...</p>
          <p className="text-xs text-text-secondary mt-1">This takes just a moment</p>
        </div>
      ) : isSuccess ? (
        <div className="flex flex-col items-center text-center">
          <CheckCircle className="h-8 w-8 text-success mb-4" />
          <p className="text-sm font-semibold text-text-primary">Resume processed successfully!</p>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center cursor-pointer">
          <UploadCloud className="h-8 w-8 text-text-secondary mb-4" />
          <p className="text-sm font-semibold text-text-primary">
            <span className="text-accent hover:underline">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-text-secondary mt-1">PDF or TXT (max 5MB)</p>
        </div>
      )}
    </div>
  )
}
