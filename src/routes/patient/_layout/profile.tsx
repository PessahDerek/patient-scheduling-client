import { createFileRoute } from '@tanstack/react-router'
import PageLayout from "../../../components/layouts/PageLayout";
import ProfilePage from "../../../components/sharedPages/ProfilePage";

export const Route = createFileRoute('/patient/_layout/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <PageLayout>
          <ProfilePage />
      </PageLayout>
  )
}
