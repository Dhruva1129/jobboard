import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Search, CheckCircle, Flame, Building2, Globe, Clock, Zap, Shield, Sparkles, Target, Rocket, FileCheck, Quote, Star, Heart } from 'lucide-react'
import { SearchBar } from '../components/forms/SearchBar'
import { JobCard } from '../components/cards/JobCard'
import { CompanyCard } from '../components/cards/CompanyCard'
import { companies } from '../data/companies'
import { allJobsWithCompany } from '../hooks/useJobsData'
import { addRecentSearch } from '../services/storage'
import { RevealOnScroll } from '../components/layout/RevealOnScroll'
import { CountUp } from '../components/ui/CountUp'
import { TextReveal } from '../components/ui/TextReveal'

import { LogoMarquee } from '../components/ui/LogoMarquee'
import { FloatingParticles } from '../components/ui/FloatingParticles'
import { Button } from '../components/ui/Button'

const STATS = [
  { label: 'Open roles', value: allJobsWithCompany.length, icon: <CheckCircle className="h-4 w-4 text-accent" /> },
  { label: 'Companies hiring', value: companies.length, icon: <Building2 className="h-4 w-4 text-accent" /> },
  { label: 'Remote-friendly', value: allJobsWithCompany.filter((j) => j.workMode !== 'Onsite').length, icon: <Globe className="h-4 w-4 text-accent" /> },
]

const POPULAR_SEARCHES = ['React', 'AI', 'Python', 'Remote', 'Frontend', 'Backend']

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: Search,
    title: 'Discover roles',
    description: 'Browse curated positions from verified companies. Filter by tech stack, salary, location, and work mode to find your perfect fit.',
  },
  {
    step: '02',
    icon: FileCheck,
    title: 'Apply directly',
    description: 'Submit your application straight to hiring managers — no middlemen, no recruiter spam. Track everything from your dashboard.',
  },
  {
    step: '03',
    icon: Rocket,
    title: 'Land your role',
    description: 'Interview with teams building products you actually care about. Get matched with roles that align with your skills and ambitions.',
  },
]

const TESTIMONIALS = [
  {
    quote: "I landed my dream role at a FAANG company through Pathway. The curated listings saved me hours of scrolling through irrelevant posts.",
    author: 'Priya Sharma',
    role: 'Senior Frontend Engineer at Google',
    avatar: 'PS',
  },
  {
    quote: "Pathway is the only job board I actually trust. Every listing has real salary data and the application process is seamless.",
    author: 'Alex Chen',
    role: 'Staff Software Engineer at Stripe',
    avatar: 'AC',
  },
  {
    quote: "The quality of companies on Pathway is unmatched. I found three great opportunities in my first week and got two interview calls.",
    author: 'Jordan Williams',
    role: 'Platform Engineer at Netflix',
    avatar: 'JW',
  },
]

export const HomePage = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const featuredCompanies = companies.slice(0, 8)
  const featuredJobs = allJobsWithCompany.filter((j) => j.featured).slice(0, 4)
  const recentJobs = [...allJobsWithCompany]
    .sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime())
    .slice(0, 6)

  const jobCountForCompany = (companyId: string) =>
    allJobsWithCompany.filter((j) => j.companyId === companyId).length

  const handleSearch = () => {
    if (query.trim()) addRecentSearch(query)
    navigate(`/jobs${query.trim() ? `?q=${encodeURIComponent(query)}` : ''}`)
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden aurora-bg bg-white">
        {/* Ambient Backgrounds */}
        <div className="absolute inset-0 bg-grid opacity-[0.25] pointer-events-none" />
        <FloatingParticles count={15} />
        
        <RevealOnScroll className="relative z-10 mx-auto max-w-4xl px-4 pt-32 pb-24 text-center sm:px-6 sm:pt-40 sm:pb-32 lg:px-8">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="flex items-center gap-1.5 rounded-full bg-accent-subtle px-3.5 py-1.5 text-xs font-semibold text-accent ring-1 ring-accent/10 shadow-sm">
              <Zap className="h-3.5 w-3.5" /> Updated Daily
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-green-50/70 px-3.5 py-1.5 text-xs font-semibold text-green-700 ring-1 ring-green-700/10 shadow-sm">
              <Globe className="h-3.5 w-3.5" /> Remote Friendly
            </span>
          </div>
          
          <h1 className="text-[2.75rem] font-bold tracking-tight text-text-primary leading-tight sm:text-6xl">
            <TextReveal text="Find your next" />
            <br />
            <span className="text-accent text-[2.75rem] sm:text-6xl font-bold">
              <TextReveal text="dream opportunity." />
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[18px] leading-relaxed text-text-secondary">
            Curated roles from the world's leading product and engineering teams. 
            Transparent salaries, verified companies, zero noise — just careers worth pursuing.
          </p>

          <div className="mx-auto mt-10 max-w-xl">
            <div className="flex flex-col gap-3 sm:flex-row shadow-premium rounded-2xl">
              <SearchBar value={query} onChange={setQuery} className="flex-1" />
              <button
                onClick={handleSearch}
                className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-accent px-8 text-[15px] font-medium text-white transition-all duration-300 hover:shadow-glow hover:-translate-y-0.5 active:scale-95"
              >
                <Search className="h-4 w-4" />
                Search
              </button>
            </div>
            
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="text-sm text-text-secondary mr-1">Popular:</span>
              {POPULAR_SEARCHES.map(term => (
                <button 
                  key={term}
                  onClick={() => { setQuery(term); handleSearch(); }}
                  className="rounded-full bg-bg-secondary/80 px-4 py-1.5 text-sm text-text-secondary transition-all duration-200 hover:bg-accent-subtle hover:text-accent hover:shadow-sm"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-20 grid max-w-2xl grid-cols-3 gap-6 pt-10">
            {STATS.map((stat, i) => (
              <RevealOnScroll key={stat.label} delay={i * 100} className="group flex flex-col items-center">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-accent-subtle transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow">
                  {stat.icon}
                </div>
                <p className="text-3xl font-bold text-text-primary tracking-tight">
                  <CountUp end={stat.value} />+
                </p>
                <p className="mt-1 text-[13px] font-medium text-text-secondary uppercase tracking-wider">{stat.label}</p>
              </RevealOnScroll>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      {/* Trusted By — Logo Marquee */}
      <section className="bg-white border-t border-border/50 py-4">
        <RevealOnScroll>
          <p className="text-center text-xs font-semibold text-text-secondary uppercase tracking-widest mb-2">
            Trusted by engineers at world-class companies
          </p>
          <LogoMarquee />
        </RevealOnScroll>
      </section>

      {/* Why Pathway Section */}
      <section className="bg-white pb-24 pt-16 sm:pb-32 sm:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-text-primary">
                Why developers prefer Pathway
              </h2>
              <p className="mt-4 text-lg text-text-secondary leading-relaxed">
                We believe that finding a job shouldn't feel like a full-time job. 
                That's why we've built a platform that puts candidate experience first.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="group flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-text-primary">Verified Companies</h3>
                <p className="mt-3 text-text-secondary leading-relaxed">
                  Every company on our platform is manually verified to ensure they offer competitive compensation and great engineering culture.
                </p>
              </div>
              <div className="group flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-text-primary">No Spam or Clutter</h3>
                <p className="mt-3 text-text-secondary leading-relaxed">
                  Say goodbye to generic recruiting spam. We strictly monitor listings to ensure you only see high-quality, relevant opportunities.
                </p>
              </div>
              <div className="group flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-premium">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-text-primary">Direct Applications</h3>
                <p className="mt-3 text-text-secondary leading-relaxed">
                  Apply directly to the hiring managers. Cut out the middleman and track all your applications in our beautifully designed dashboard.
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-bg-secondary border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-text-primary">
                How it works
              </h2>
              <p className="mt-4 text-lg text-text-secondary leading-relaxed">
                Three simple steps from discovery to your dream role. No complicated sign-ups, no hidden fees.
              </p>
            </div>
          </RevealOnScroll>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {HOW_IT_WORKS.map((item, i) => (
              <RevealOnScroll key={item.step} delay={i * 150}>
                <div className="group relative flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-border/50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-premium">
                  <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-0.5 text-[11px] font-bold text-white shadow-sm">
                    Step {item.step}
                  </span>
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-subtle text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:shadow-glow">
                    <item.icon className="h-7 w-7" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-bold text-text-primary">{item.title}</h3>
                  <p className="mt-3 text-sm text-text-secondary leading-relaxed">{item.description}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Featured companies */}
      <section className="bg-white border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <RevealOnScroll className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-text-primary">
                Featured companies
              </h2>
              <p className="mt-2 text-text-secondary">Top teams actively hiring right now.</p>
            </div>
            <a href="/companies" className="group flex items-center gap-1 text-sm font-medium text-accent transition-all duration-200 hover:text-accent-hover">
              View all <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </RevealOnScroll>
          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {featuredCompanies.map((company, i) => (
              <RevealOnScroll key={company.id} delay={i * 50}>
                <CompanyCard company={company} jobCount={jobCountForCompany(company.id)} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Featured jobs */}
      {featuredJobs.length > 0 && (
        <section className="bg-bg-secondary border-t border-border/50">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <RevealOnScroll className="flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
                  <Flame className="h-5 w-5 text-accent" /> Featured roles
                </h2>
                <p className="mt-2 text-text-secondary">Hand-picked opportunities from top engineering teams.</p>
              </div>
            </RevealOnScroll>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {featuredJobs.map((job, i) => (
                <RevealOnScroll key={job.id} delay={i * 100}>
                  <JobCard job={job} />
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="bg-white border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-text-primary">
                Loved by engineers worldwide
              </h2>
              <p className="mt-4 text-lg text-text-secondary leading-relaxed">
                Join thousands of developers who found their dream roles through Pathway.
              </p>
            </div>
          </RevealOnScroll>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <RevealOnScroll key={t.author} delay={i * 100}>
                <div className="group relative flex flex-col p-7 rounded-2xl bg-gradient-to-b from-white to-bg-secondary border border-border/50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-premium">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, si) => (
                      <Star key={si} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="h-5 w-5 text-accent/30 mb-3" />
                  <p className="text-sm leading-relaxed text-text-secondary flex-1">"{t.quote}"</p>
                  <div className="mt-6 flex items-center gap-3 border-t border-border/50 pt-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white text-xs font-bold">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{t.author}</p>
                      <p className="text-xs text-text-secondary">{t.role}</p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Recently added */}
      <section className="bg-bg-secondary border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <RevealOnScroll className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
                <Clock className="h-5 w-5 text-accent" /> Recently added
              </h2>
              <p className="mt-2 text-text-secondary">Fresh opportunities posted this week.</p>
            </div>
            <a href="/jobs" className="group flex items-center gap-1 text-sm font-medium text-accent transition-all duration-200 hover:text-accent-hover">
              View all <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </RevealOnScroll>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recentJobs.map((job, i) => (
              <RevealOnScroll key={job.id} delay={i * 100}>
                <JobCard job={job} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-white border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="relative overflow-hidden rounded-3xl bg-accent p-12 text-center sm:p-16">
              <div className="absolute inset-0 bg-grid opacity-[0.1]" />
              <div className="relative z-10">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
                  <Heart className="h-4 w-4" /> Join 10,000+ developers
                </div>
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  Ready to find your next role?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-white/80 leading-relaxed">
                  Stop scrolling through hundreds of irrelevant listings. Pathway surfaces the roles that actually match your skills and ambitions.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    onClick={() => navigate('/jobs')}
                    className="!bg-white !text-accent hover:!bg-white/90 px-8 py-3 text-base font-semibold rounded-xl shadow-lg"
                  >
                    Browse open roles <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => navigate('/companies')}
                    className="!bg-white/10 !text-white !border-white/20 hover:!bg-white/20 px-8 py-3 text-base font-semibold rounded-xl backdrop-blur-sm"
                  >
                    Explore companies
                  </Button>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  )
}
