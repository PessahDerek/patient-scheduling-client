import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/patient/_layout/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/patient/_layout/"!</div>
}
