// Request a password-reset email. Supabase sends a recovery link that returns
// to /admin/reset-password.
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import AuthShell from './AuthShell'
import { useAuth } from './AuthProvider'
import { Field, Button } from '../ui/primitives'

const schema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
})

export default function ForgotPassword() {
  const { requestPasswordReset } = useAuth()
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async ({ email }) => {
    try {
      await requestPasswordReset(email)
      setSent(true)
      toast.success('Reset link sent — check your inbox.')
    } catch (err) {
      toast.error(err.message || 'Could not send reset email')
    }
  }

  return (
    <AuthShell
      title="Reset password"
      subtitle="We'll email you a secure link to set a new password."
      footer={
        <Link to="/admin/login" className="font-semibold text-accent-600 hover:underline">
          ← Back to sign in
        </Link>
      }
    >
      {sent ? (
        <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-800">
          If an account exists for that email, a reset link is on its way. The link expires shortly for security.
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <Field
            id="email"
            type="email"
            label="Email address"
            placeholder="admin@zurconstruction.com"
            error={errors.email?.message}
            {...register('email')}
          />
          <Button type="submit" variant="ink" className="w-full" loading={isSubmitting}>
            Send reset link
          </Button>
        </form>
      )}
    </AuthShell>
  )
}
