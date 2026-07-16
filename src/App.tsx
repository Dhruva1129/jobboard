import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RootLayout } from './components/layout/RootLayout'
import { HomePage } from './pages/HomePage'
import { JobsPage } from './pages/JobsPage'
import { JobDetailsPage } from './pages/JobDetailsPage'
import { SavedJobsPage } from './pages/SavedJobsPage'
import { DashboardPage } from './pages/DashboardPage'
import { AboutPage } from './pages/AboutPage'
import { CompaniesPage } from './pages/CompaniesPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { RecommendedJobsPage } from './pages/RecommendedJobsPage'
import { SavedJobsProvider } from './contexts/SavedJobsContext'
import { ToastProvider } from './contexts/ToastContext'
import { ResumeProvider } from './contexts/ResumeContext'

function App() {
  return (
    <ToastProvider>
      <ResumeProvider>
        <SavedJobsProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<RootLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/jobs" element={<JobsPage />} />
                <Route path="/jobs/:jobId" element={<JobDetailsPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/recommended" element={<RecommendedJobsPage />} />
                <Route path="/saved" element={<SavedJobsPage />} />
                <Route path="/companies" element={<CompaniesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SavedJobsProvider>
      </ResumeProvider>
    </ToastProvider>
  )
}

export default App
