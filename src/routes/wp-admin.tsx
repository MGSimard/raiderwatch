import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/wp-admin')({
  component: RouteComponent,
})

function RouteComponent() {
  return <img src="/assets/media/no.jpg" alt="No access" className="fixed inset-0 w-full h-full" />
}
