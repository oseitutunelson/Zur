// Admin login. Email + password with zod validation. Supabase Auth handles
// hashing, session issuance and login rate-limiting; we surface its errors.
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { toast } from 'sonner'
import AuthShell from './AuthShell'
import { useAuth } from './AuthProvider'
import { Field, Button, Label } from '../ui/primitives'
import AdminIcon from '../ui/AdminIcon'

const schema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})

export default function Login() {
  const { signIn, isAuthenticated, configured } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [showPw, setShowPw] = useState(false)
  const from = location.state?.from?.pathname || '/admin'

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  })

  if (isAuthenticated) return <Navigate to={from} replace />

  const onSubmit = async ({ email, password }) => {
    try {
      await signIn(email, password)
      toast.success('Welcome back')
      navigate(from, { replace: true })
    } catch (err) {
      const msg = /rate limit/i.test(err.message)
        ? 'Too many attempts. Please wait a moment and try again.'
        : /invalid login/i.test(err.message)
        ? 'Invalid email or password.'
        : err.message || 'Sign in failed'
      toast.error(msg)
    }
  }

  return (
    <AuthShell
      title="Sign in"
      subtitle="Enter your credentials to access the dashboard."
      footer={
        <span>
          Forgot your password?{' '}
          <Link to="/admin/forgot-password" className="font-semibold text-accent-600 hover:underline">
            Reset it
          </Link>
        </span>
      }
    >
      {!configured && (
        <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
          <p className="font-semibold">Supabase not configured yet</p>
          <p className="mt-1">
            Add your project URL and anon key to <code>.env.local</code> (see{' '}
            <code>.env.example</code>) and run <code>supabase/schema.sql</code>, then restart the dev server.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <Field
          id="email"
          type="email"
          label="Email address"
          placeholder="admin@zurconstruction.com"
          autoComplete="username"
          error={errors.email?.message}
          {...register('email')}
        />

        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <input
              id="password"
              type={showPw ? 'text' : 'password'}
              placeholder="••••••••"
              autoComplete="current-password"
              className="w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 pr-11 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-accent focus:ring-2 focus:ring-accent/20"
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-lg text-ink/40 hover:text-ink"
              aria-label={showPw ? 'Hide password' : 'Show password'}
            >
              <AdminIcon name="eye" size={18} />
            </button>
          </div>
          {errors.password && <p className="mt-1 text-xs font-medium text-red-500">{errors.password.message}</p>}
        </div>

        <Button type="submit" variant="ink" className="w-full" loading={isSubmitting} disabled={!configured}>
          Sign in
        </Button>
      </form>
    </AuthShell>
  )
}
