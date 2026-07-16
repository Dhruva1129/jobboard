import { companies } from '../../data/companies'
import { CompanyLogo } from './CompanyLogo'

export const LogoMarquee = () => {
  const doubledCompanies = [...companies, ...companies]

  return (
    <div className="relative overflow-hidden py-6">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />
      
      <div className="marquee-track">
        {doubledCompanies.map((company, i) => (
          <div
            key={`${company.id}-${i}`}
            className="mx-6 flex items-center gap-3 shrink-0 opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
          >
            <CompanyLogo name={company.name} letter={company.logo} website={company.website} size="sm" />
            <span className="text-sm font-medium text-text-secondary whitespace-nowrap">{company.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
