import { Link } from 'react-router-dom'
import { Briefcase, Globe, Mail, MessageCircle, ArrowRight } from 'lucide-react'
import { NAV_LINKS } from '../../constants'


export const Footer = () => (
  <footer className="border-t border-border/50 bg-white gradient-border">
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xs">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white shadow-md">
              <Briefcase className="h-4 w-4" strokeWidth={2.25} />
            </div>
            <span className="text-[17px] font-bold tracking-tight text-text-primary">Pathway</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-text-secondary">
            A focused job board connecting talented people with roles at companies building the products they use every day. 
            Curated listings, transparent salaries, zero noise.
          </p>
          {/* Newsletter */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-text-primary mb-2">Stay in the loop</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="you@email.com"
                className="flex-1 rounded-lg border border-border bg-bg-secondary px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/60 outline-none transition-all duration-200 focus:border-accent focus:ring-2 focus:ring-accent/10"
              />
              <button className="rounded-lg bg-accent px-3 py-2 text-sm font-medium text-white transition-all duration-200 hover:shadow-glow active:scale-95">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-[11px] text-text-secondary">Weekly digest of new roles. No spam, unsubscribe anytime.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <h4 className="text-sm font-semibold text-text-primary">Product</h4>
            <ul className="mt-3 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-text-secondary transition-all duration-200 hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary">Account</h4>
            <ul className="mt-3 space-y-2.5">
              <li>
                <Link to="/saved" className="text-sm text-text-secondary transition-all duration-200 hover:text-accent">
                  Saved jobs
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-text-secondary transition-all duration-200 hover:text-accent">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary">Resources</h4>
            <ul className="mt-3 space-y-2.5">
              <li>
                <Link to="/about" className="text-sm text-text-secondary transition-all duration-200 hover:text-accent">
                  About us
                </Link>
              </li>
              <li>
                <span className="text-sm text-text-secondary">Privacy policy</span>
              </li>
              <li>
                <span className="text-sm text-text-secondary">Terms of service</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center gap-6 border-t border-border/50 pt-8 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-5">
          <a href="#" className="text-text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:text-accent" aria-label="Website">
            <Globe className="h-5 w-5" />
          </a>
          <a href="#" className="text-text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:text-accent" aria-label="Contact">
            <Mail className="h-5 w-5" />
          </a>
          <a href="#" className="text-text-secondary transition-all duration-200 hover:-translate-y-0.5 hover:text-accent" aria-label="Community">
            <MessageCircle className="h-5 w-5" />
          </a>
        </div>
        <div className="flex flex-col items-center gap-3 sm:items-end">
          <p className="text-sm text-text-secondary">© 2026 Pathway. All rights reserved.</p>
          <p className="text-xs text-text-secondary">Built with React, TypeScript &amp; Tailwind CSS.</p>
        </div>
      </div>
    </div>
  </footer>
)
