# Pathway — Job Board

A production-quality, minimal job board application. Browse, search, filter, save, and apply to roles from a curated set of companies — built as a premium, Stripe/Linear/Vercel-inspired interface.

---

## Overview

Pathway is a fully client-side job board: no backend, no database, no auth server. Job and company data is bundled as typed mock data, saved jobs and applications persist to `localStorage`, and the entire experience — search, filtering, sorting, pagination, applying — runs in the browser. It's built to demonstrate clean architecture and interface craft rather than to be a real hiring platform.

## Features

- **Landing page** — hero search, featured companies, featured & recently-added roles, live stats
- **Jobs listing** — real-time search (title, company, location, skill), faceted filters (location, employment type, experience, work mode, salary floor), sorting (newest, highest salary, recently updated), grid/list toggle, pagination, loading skeletons, empty state
- **Job details** — full description, responsibilities, requirements, preferred skills, benefits, tech stack, company overview, related jobs
- **Apply flow** — modal form (name, email, phone, LinkedIn, portfolio, resume link) with validation and a success state; applications persist to `localStorage`
- **Saved jobs** — bookmark from any card or detail page, persisted to `localStorage`, dedicated page with empty state
- **Companies directory** and **About** page
- **Toast notifications**, **404 page**, **scroll-to-top**, **breadcrumbs**
- Fully responsive: collapsing navbar, filter drawer on mobile, cards that stack cleanly
- Accessible: semantic HTML, keyboard-navigable controls, visible focus states, ARIA labels

## Tech stack

| Layer      | Choice                              |
| ---------- | ------------------------------------ |
| Framework  | React 19 + TypeScript (strict mode)  |
| Build tool | Vite                                 |
| Styling    | Tailwind CSS v4                      |
| Routing    | React Router v7                      |
| Icons      | lucide-react                         |
| State      | React Context + hooks (no external state library) |
| Persistence| `localStorage` via a thin service layer |

No UI kit (MUI/Chakra/etc.) is used — every component is hand-built on top of Tailwind utilities.

## Architecture

- **`components/ui`** — primitive, style-only building blocks (Button, Badge, Input, Skeleton, EmptyState, CompanyLogo)
- **`components/layout`** — Navbar, Footer, RootLayout, Breadcrumb, scroll behavior
- **`components/cards`** — JobCard, CompanyCard
- **`components/forms`** — SearchBar, ApplicationForm
- **`components/filters`** — FilterPanel, ActiveFilterChips
- **`components/modals`** — generic Modal shell, ApplyModal, FilterDrawer (mobile)
- **`pages`** — one component per route, composed from the above
- **`hooks`** — `useFilteredJobs`, `useRelatedJobs`, `useDebounce`
- **`contexts`** — `SavedJobsContext`, `ToastContext`
- **`services`** — `localStorage` read/write helpers, isolated from components
- **`utils`** — search/filter/sort logic, formatting (salary, relative dates)
- **`data`** — typed mock companies and jobs
- **`types`** — shared domain types
- **`constants`** — filter option lists, nav links, storage keys

Business logic (filtering, sorting, storage) is kept out of components so it's independently testable and reusable.

## Folder structure

```
src/
├── assets/
├── components/
│   ├── cards/
│   ├── filters/
│   ├── forms/
│   ├── layout/
│   ├── modals/
│   └── ui/
├── constants/
├── contexts/
├── data/
├── hooks/
├── pages/
├── services/
├── types/
├── utils/
├── App.tsx
├── index.css
└── main.tsx
```

## Installation

Requires Node.js 20+.

```bash
git clone <repository-url>
cd jobboard
npm install
```

## Running locally

```bash
npm run dev        # start the dev server at http://localhost:5173
npm run typecheck  # strict TypeScript project check
npm run lint        # oxlint
npm run build        # production build to dist/
npm run preview      # preview the production build locally
```

## Deployment

The app is a static single-page app and deploys cleanly to Vercel with zero configuration:

1. Import the repository in the [Vercel dashboard](https://vercel.com/new), or run `vercel` from the project root.
2. Vercel auto-detects the Vite framework preset (build command `npm run build`, output directory `dist`).
3. `vercel.json` includes a catch-all rewrite so client-side routes (e.g. `/jobs/job-01`) resolve correctly on refresh.

### CI/CD

`.github/workflows/deploy.yml` runs on every push and pull request to `main`:

1. Install dependencies
2. Lint (`oxlint`)
3. Type check (`tsc -b --noEmit`)
4. Build (`vite build`)
5. On `main`, deploy the build to Vercel using the Vercel CLI

To enable the deploy job, add these repository secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.

## Screenshots

_Add screenshots of the home, jobs, job details, and saved jobs pages here._

| Home | Jobs | Job details | Saved jobs |
| ---- | ---- | ------------ | ---------- |
|      |      |              |            |

## Future improvements

- Replace mock data with a real API and add server-side pagination
- Add authentication so applications and saved jobs sync across devices
- Add a recruiter-facing flow for posting and managing listings
- Add automated tests (component tests + e2e coverage of the apply flow)
- Add URL-synced filters so filtered views are shareable and back/forward-safe
- Add dark mode as an opt-in theme

## License

MIT
