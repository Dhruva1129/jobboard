import { useState } from 'react'

const GRADIENTS = [
  'bg-gray-100 text-gray-800',
  'bg-gray-200 text-gray-900',
  'bg-gray-100 text-gray-700',
]

const hashString = (value: string): number => {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

interface CompanyLogoProps {
  name: string
  letter: string
  website?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs rounded-lg',
  md: 'h-11 w-11 text-sm rounded-xl',
  lg: 'h-14 w-14 text-lg rounded-xl',
  xl: 'h-20 w-20 text-2xl rounded-2xl',
}

export const CompanyLogo = ({ name, letter, website, size = 'md' }: CompanyLogoProps) => {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading')
  const gradient = GRADIENTS[hashString(name) % GRADIENTS.length]

  if (website && status !== 'error') {
    return (
      <div className={`relative shrink-0 ${sizeClasses[size]}`}>
        <img
          src={`https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${website}&size=128`}
          alt={`${name} logo`}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`${sizeClasses[size]} object-contain bg-white border border-border/40 p-1.5 shadow-sm transition-all duration-300 hover:shadow-md ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    )
  }

  return (
    <div
      className={`flex items-center justify-center font-bold shrink-0 ${gradient} shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 ${sizeClasses[size]}`}
      aria-hidden="true"
    >
      {letter}
    </div>
  )
}
