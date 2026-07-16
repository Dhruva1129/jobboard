import { SpotlightCard } from '../ui/SpotlightCard'
import type { Company } from '../../types'
import { CompanyLogo } from '../ui/CompanyLogo'
import { Building2, Users } from 'lucide-react'

export const CompanyCard = ({ company, jobCount }: { company: Company; jobCount: number }) => (
  <SpotlightCard
    to={`/jobs?company=${company.id}`}
    className="flex-col items-center gap-4 p-7 text-center"
  >
    <div className="relative">
      <div className="absolute inset-0 scale-[1.4] rounded-full bg-gradient-to-br from-accent/5 to-violet/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative transition-all duration-300 group-hover:scale-105">
        <CompanyLogo name={company.name} letter={company.logo} website={company.website} size="lg" />
      </div>
    </div>
    <div className="mt-1 flex flex-col items-center gap-1.5">
      <p className="text-[15px] font-bold tracking-tight text-text-primary transition-colors duration-200 group-hover:text-accent">{company.name}</p>
      
      {/* Industry & Size */}
      <div className="flex items-center gap-3 text-[12px] text-text-secondary">
        <span className="flex items-center gap-1">
          <Building2 className="h-3 w-3" />
          {company.industry}
        </span>
        <span className="h-0.5 w-0.5 rounded-full bg-text-secondary/50" />
        <span className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          {company.size.split(' ')[0]}
        </span>
      </div>
      
      {/* Hiring badge with pulse */}
      <div className="mt-2 inline-flex items-center rounded-full bg-accent-subtle px-2.5 py-0.5 text-xs font-medium text-accent opacity-80 transition-opacity duration-200 group-hover:opacity-100">
        <span className="relative flex h-1.5 w-1.5 mr-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent"></span>
        </span>
        Hiring: {jobCount} role{jobCount !== 1 && 's'}
      </div>
      
      {/* Mission statement */}
      <p className="mt-1.5 text-[11px] text-text-secondary leading-relaxed line-clamp-2 max-w-[200px]">
        {company.mission}
      </p>
    </div>
  </SpotlightCard>
)
