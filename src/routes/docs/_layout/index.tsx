import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/docs/_layout/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div>Hello "/docs/_layout/"!</div>
}
