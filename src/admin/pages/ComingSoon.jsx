// Placeholder for dashboard modules scheduled for later phases. Keeps the
// full navigation structure visible and honest about what's built.
import { Card } from '../ui/primitives'
import AdminIcon from '../ui/AdminIcon'
import PageHeader from '../ui/PageHeader'

export default function ComingSoon({ title = 'Module', phase = 'a later phase', icon = 'spark' }) {
  return (
    <>
      <PageHeader title={title} subtitle="This module is part of the phased rollout." />
      <Card className="grid place-items-center px-6 py-20 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-accent/15 text-accent-600">
          <AdminIcon name={icon} size={30} />
        </span>
        <h2 className="mt-5 font-display text-xl font-bold text-ink dark:text-bone">Coming in {phase}</h2>
        <p className="mt-2 max-w-md text-sm text-ink/55 dark:text-bone/50">
          The foundation, authentication, dashboard and full Project management are live now.
          {' '}
          <span className="font-medium text-ink/70 dark:text-bone/70">{title}</span> arrives next.
        </p>
      </Card>
    </>
  )
}
