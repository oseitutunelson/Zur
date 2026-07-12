// Set a new password after following the recovery link. Supabase establishes a
// temporary recovery session (detectSessionInUrl) so updateUser() can set the
// new password. Enforces a minimum strength on the client; Supabase also
// enforces its configured minimum server-side.
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import AuthShell from './AuthShell'
import { useAuth } from './AuthProvider'
import { supabase } from '../../lib/supabase'
import { Field, Button } from '../ui/primitives'

const schema = z
  .object({
    password: z
      .string()
      .min(8, 'At least 8 characters')
      .regex(/[A-Z]/, 'Include an uppercase letter')
      .regex(/[a-z]/, 'Include a lowercase letter')
      .regex(/[0-9]/, 'Include a number'),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, { path: ['confirm'], message: 'Passwords do not match' })

export default function ResetPassword() {
  const { updatePassword } = useAuth()
  const navigate = useNavigate()
  const [ready, setReady] = useState(false)

  // Confirm a recovery session exists (from the email link).
  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => setReady(!!data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') setReady(true)
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async ({ password }) => {
    try {
      await updatePassword(password)
      toast.success('Password updated — you can sign in now.')
      navigate('/admin/login', { replace: true })
    } catch (err) {
      toast.error(err.message || 'Could not update password')
    }
  }

  return (
    <AuthShell
      title="New password"
      subtitle="Choose a strong password you haven't used before."
      footer={
        <Link to="/admin/login" className="font-semibold text-accent-600 hover:underline">
          ← Back to sign in
        </Link>
      }
    >
      {!ready ? (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
          Open this page from the reset link in your email. If the link expired, request a new one from the
          forgot-password page.
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <Field
            id="password"
            type="password"
            label="New password"
            placeholder="••••••••"
            autoComplete="new-password"
            error={errors.password?.message}
            {...register('password')}
          />
          <Field
            id="confirm"
            type="password"
            label="Confirm password"
            placeholder="••••••••"
            autoComplete="new-password"
            error={errors.confirm?.message}
            {...register('confirm')}
          />
          <Button type="submit" variant="ink" className="w-full" loading={isSubmitting}>
            Update password
          </Button>
        </form>
      )}
    </AuthShell>
  )
}
