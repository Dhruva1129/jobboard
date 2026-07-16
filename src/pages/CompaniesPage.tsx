import { companies } from '../data/companies'
import { allJobsWithCompany } from '../hooks/useJobsData'
import { CompanyCard } from '../components/cards/CompanyCard'
import { RevealOnScroll } from '../components/layout/RevealOnScroll'

import { CountUp } from '../components/ui/CountUp'
import { Building2, Globe, Users, Briefcase } from 'lucide-react'

export const CompaniesPage = () => {
  const jobCountForCompany = (companyId: string) =>
    allJobsWithCompany.filter((j) => j.companyId === companyId).length

  const totalJobs = allJobsWithCompany.length
  const remoteJobs = allJobsWithCompany.filter(j => j.workMode === 'Remote').length
  const industries = new Set(companies.map(c => c.industry)).size

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero header */}
      <RevealOnScroll>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Explore top companies hiring now
          </h1>
          <p className="mt-4 text-lg text-text-secondary leading-relaxed">
            We partner with the best product, engineering, and design teams across the globe. 
            Every company is verified — real roles, real salaries, real culture.
          </p>
        </div>
      </RevealOnScroll>

      {/* Stats */}
      <RevealOnScroll>
        <div className="mx-auto max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          <div className="flex flex-col items-center p-5 rounded-2xl bg-bg-secondary border border-border">
            <Building2 className="h-5 w-5 text-accent mb-2" />
            <span className="text-2xl font-bold text-text-primary"><CountUp end={companies.length} /></span>
            <span className="text-xs font-medium text-text-secondary uppercase tracking-wider mt-1">Companies</span>
          </div>
          <div className="flex flex-col items-center p-5 rounded-2xl bg-bg-secondary border border-border">
            <Briefcase className="h-5 w-5 text-accent mb-2" />
            <span className="text-2xl font-bold text-text-primary"><CountUp end={totalJobs} /></span>
            <span className="text-xs font-medium text-text-secondary uppercase tracking-wider mt-1">Open Roles</span>
          </div>
          <div className="flex flex-col items-center p-5 rounded-2xl bg-bg-secondary border border-border">
            <Globe className="h-5 w-5 text-accent mb-2" />
            <span className="text-2xl font-bold text-text-primary"><CountUp end={remoteJobs} /></span>
            <span className="text-xs font-medium text-text-secondary uppercase tracking-wider mt-1">Remote Jobs</span>
          </div>
          <div className="flex flex-col items-center p-5 rounded-2xl bg-bg-secondary border border-border">
            <Users className="h-5 w-5 text-accent mb-2" />
            <span className="text-2xl font-bold text-text-primary"><CountUp end={industries} /></span>
            <span className="text-xs font-medium text-text-secondary uppercase tracking-wider mt-1">Industries</span>
          </div>
        </div>
      </RevealOnScroll>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {companies.map((company, i) => (
          <RevealOnScroll key={company.id} delay={i * 40}>
            <CompanyCard company={company} jobCount={jobCountForCompany(company.id)} />
          </RevealOnScroll>
        ))}
      </div>
    </div>
  )
}
