import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import { Button } from '../components/ui/Button'

export const NotFoundPage = () => (
  <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-28 text-center sm:px-6">
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-bg-secondary">
      <Compass className="h-6 w-6 text-text-secondary" strokeWidth={1.75} />
    </div>
    <p className="mt-6 text-sm font-medium text-accent">404</p>
    <h1 className="mt-2 text-2xl font-semibold text-text-primary">Page not found</h1>
    <p className="mt-2 text-sm text-text-secondary">
      The page you\u2019re looking for doesn\u2019t exist or may have been moved.
    </p>
    <Link to="/" className="mt-8">
      <Button>Back to home</Button>
    </Link>
  </div>
)
