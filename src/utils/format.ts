export const formatSalary = (min: number, max: number, currency: string): string => {
  const isHourly = currency.includes('/hr')
  const fmt = (n: number) => {
    if (isHourly) return `$${n}`
    if (n >= 1000) return `$${Math.round(n / 1000)}k`
    return `$${n}`
  }
  const suffix = isHourly ? '/hr' : ''
  return `${fmt(min)} \u2013 ${fmt(max)}${suffix}`
}

export const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date('2026-07-15')
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays <= 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays}d ago`
  const weeks = Math.floor(diffDays / 7)
  if (weeks < 5) return `${weeks}w ago`
  const months = Math.floor(diffDays / 30)
  return `${months}mo ago`
}

export const formatFullDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}
