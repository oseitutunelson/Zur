// Admin sub-application: providers (theme, auth, confirm dialog, toasts) and
// the full /admin route tree. Mounted by App.jsx for any /admin/* path,
// outside the public site's Layout.
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { ThemeProvider, useTheme } from './ui/theme'
import { AuthProvider } from './auth/AuthProvider'
import { ProtectedRoute } from './auth/ProtectedRoute'
import { ConfirmProvider } from './ui/ConfirmDialog'
import AdminLayout from './AdminLayout'
import ComingSoon from './pages/ComingSoon'

// Auth pages
import Login from './auth/Login'
import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'

// Dashboard pages (code-split)
const Dashboard = lazy(() => import('./pages/Dashboard'))
const ProjectsList = lazy(() => import('./pages/ProjectsList'))
const ProjectForm = lazy(() => import('./pages/ProjectForm'))

function Loader() {
  return (
    <div className="grid min-h-[50vh] place-items-center">
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-ink/15 border-t-accent dark:border-white/15" />
    </div>
  )
}

// Toaster that follows the admin theme.
function ThemedToaster() {
  const { theme } = useTheme()
  return <Toaster theme={theme} position="top-right" richColors closeButton />
}

export default function AdminApp() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ConfirmProvider>
          <ThemedToaster />
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* Public auth routes */}
              <Route path="login" element={<Login />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />

              {/* Protected dashboard */}
              <Route
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="projects" element={<ProjectsList />} />
                <Route path="projects/new" element={<ProjectForm />} />
                <Route path="projects/:id/edit" element={<ProjectForm />} />
                <Route path="services" element={<ComingSoon title="Service Management" phase="Phase 2" icon="services" />} />
                <Route path="homepage" element={<ComingSoon title="Homepage Content" phase="Phase 2" icon="home" />} />
                <Route path="gallery" element={<ComingSoon title="Gallery Manager" phase="Phase 4" icon="gallery" />} />
                <Route path="messages" element={<ComingSoon title="Contact Center" phase="Phase 3" icon="inbox" />} />
                <Route path="testimonials" element={<ComingSoon title="Testimonials" phase="Phase 3" icon="quote" />} />
                <Route path="partners" element={<ComingSoon title="Partners & Clients" phase="Phase 3" icon="partners" />} />
                <Route path="files" element={<ComingSoon title="File Manager" phase="Phase 4" icon="files" />} />
                <Route path="activity" element={<ComingSoon title="Activity Log" phase="Phase 5" icon="activity" />} />
                <Route path="settings" element={<ComingSoon title="Website Settings" phase="Phase 4" icon="settings" />} />
              </Route>
            </Routes>
          </Suspense>
        </ConfirmProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
