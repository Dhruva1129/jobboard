import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ScrollToTop } from './ScrollToTop'
import { ScrollToTopButton } from './ScrollToTopButton'

export const RootLayout = () => (
  <div className="flex min-h-screen flex-col bg-white">
    <ScrollToTop />
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
    <ScrollToTopButton />
  </div>
)
