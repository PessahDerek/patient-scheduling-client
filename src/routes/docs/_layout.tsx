import { createFileRoute, Outlet } from '@tanstack/react-router'
import DashboardLayout from '../../components/layouts/DashboardLayout'

export const Route = createFileRoute('/docs/_layout')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  )
}
