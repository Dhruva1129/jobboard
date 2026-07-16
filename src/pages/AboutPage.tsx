import { Target, Eye, Sparkles, Heart, Shield, Rocket, Code, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { RevealOnScroll } from '../components/layout/RevealOnScroll'

import { CountUp } from '../components/ui/CountUp'
import { Button } from '../components/ui/Button'
import { allJobsWithCompany } from '../hooks/useJobsData'
import { companies } from '../data/companies'

const VALUES = [
  {
    icon: Target,
    title: 'Our mission',
    body: 'To connect skilled people with roles at companies doing meaningful work, without the noise of a typical job search.',
    gradient: 'bg-accent',
  },
  {
    icon: Eye,
    title: 'Our vision',
    body: 'A hiring process that respects everyone\u2019s time — clear listings, honest compensation, and a straightforward path to apply.',
    gradient: 'bg-accent',
  },
  {
    icon: Sparkles,
    title: 'How we work',
    body: 'We keep the product simple on purpose. Every listing is curated, every detail is verified, and every interaction is fast.',
    gradient: 'bg-accent',
  },
]

const PRINCIPLES = [
  {
    icon: Shield,
    title: 'Transparency first',
    description: 'Every listing includes real salary ranges, clear requirements, and honest descriptions. No bait-and-switch tactics.',
  },
  {
    icon: Heart,
    title: 'Candidate experience',
    description: 'We obsess over making the search process delightful. From our filters to our application flow, every pixel is intentional.',
  },
  {
    icon: Code,
    title: 'Built by engineers',
    description: 'We are engineers ourselves. We understand what matters — tech stack visibility, culture fit, and remote flexibility.',
  },
  {
    icon: Rocket,
    title: 'Quality over quantity',
    description: 'We will never be the biggest job board. We aim to be the most trusted one, where every listing is worth your time.',
  },
]

export const AboutPage = () => (
  <div>
    {/* Hero */}
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <RevealOnScroll>
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          About Pathway
        </h1>
        <p className="mt-4 text-[17px] leading-relaxed text-text-secondary">
          Pathway is a focused job board built for people who want to spend less time searching and more time doing
          great work. We partner with product, engineering, and design teams at companies of every size to surface
          roles worth applying to.
        </p>
        <p className="mt-4 text-[17px] leading-relaxed text-text-secondary">
          We started Pathway because we were tired of the noise in traditional job search. 
          The endless recruiter emails, the vague salary ranges, and the outdated listings that waste everyone's time. 
          We believe there's a better way.
        </p>
      </RevealOnScroll>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {VALUES.map((value, i) => (
          <RevealOnScroll key={value.title} delay={i * 100}>
            <div className="group rounded-2xl border border-border/50 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-premium">
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${value.gradient} text-white shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                <value.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h2 className="mt-4 text-[15px] font-bold text-text-primary">{value.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{value.body}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>

    {/* By the Numbers */}
    <div className="bg-bg-secondary border-t border-border/50 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h2 className="text-center text-2xl font-bold tracking-tight text-text-primary mb-12">
            Pathway by the numbers
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center">
              <span className="text-3xl font-bold text-text-primary"><CountUp end={allJobsWithCompany.length} />+</span>
              <span className="mt-1 text-sm text-text-secondary">Active roles</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-3xl font-bold text-text-primary"><CountUp end={companies.length} /></span>
              <span className="mt-1 text-sm text-text-secondary">Verified companies</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-3xl font-bold text-text-primary"><CountUp end={10} />k+</span>
              <span className="mt-1 text-sm text-text-secondary">Monthly visitors</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-3xl font-bold text-text-primary"><CountUp end={95} />%</span>
              <span className="mt-1 text-sm text-text-secondary">Satisfaction rate</span>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>

    {/* Principles */}
    <div className="bg-white border-t border-border/50 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h2 className="text-center text-2xl font-bold tracking-tight text-text-primary mb-12">
            Our principles
          </h2>
        </RevealOnScroll>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PRINCIPLES.map((p, i) => (
            <RevealOnScroll key={p.title} delay={i * 100}>
              <div className="group flex gap-4 p-6 rounded-2xl border border-border/50 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-premium">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-subtle text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                  <p.icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-text-primary">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{p.description}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>

    {/* CTA */}
    <div className="bg-bg-secondary border-t border-border/50 py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <RevealOnScroll>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">
            Ready to get started?
          </h2>
          <p className="mt-3 text-text-secondary leading-relaxed">
            Explore curated roles from companies that are building the future.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link to="/jobs">
              <Button className="px-8">
                Browse jobs <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
            <Link to="/companies">
              <Button variant="secondary" className="px-8">
                View companies
              </Button>
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  </div>
)
