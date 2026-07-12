import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'

// Code-split secondary routes for faster initial load.
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

// The admin dashboard is a self-contained sub-app with its own chrome, so it is
// rendered outside the public site Layout.
const AdminApp = lazy(() => import('./admin/AdminApp'))

function PageFallback() {
  return (
    <div className="grid min-h-screen place-items-center bg-ink">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-accent" />
    </div>
  )
}

export default function App() {
  const { pathname } = useLocation()

  // Admin area: no public navbar/footer, separate route tree.
  if (pathname.startsWith('/admin')) {
    return (
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </Suspense>
    )
  }

  return (
    <Layout>
      <ScrollToTop />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}
