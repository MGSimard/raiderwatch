import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/authorization')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/authorization"!</div>
}
