import * as React from 'react'
import {createRootRoute, Outlet, useLoaderData} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/router-devtools'
import AuthProvider from "../context/Auth";
import PendingScreen from "../components/PendingScreen";
import api from "../libs/axios/axios";
import {useStore} from "zustand/react";
import HospiStore from "../stores/HospiStore";
import {useEffect} from "react";

export const Route = createRootRoute({
    component: RootComponent,
    loader: async (): Promise<{ docs: DocObj[], workingDays: ScheduleDays[] }> => {
        const docs = (await api.get("/app/doctors")).data
        const workingDays = (await api.get("/app/working-days")).data
        return {docs, workingDays}
    },
    pendingComponent: PendingScreen
})

function RootComponent() {
    const {docs, workingDays} = useLoaderData({from: "__root__"})
    const {addDoctors, addWorkingDays} = useStore(HospiStore)

    useEffect(() => {
        if (docs && Array.isArray(docs) && docs.length > 0)
            addDoctors(docs)
        if (workingDays && Array.isArray(workingDays) && workingDays.length > 0)
            addWorkingDays(workingDays)
    }, [])

    return (
        <>
            <AuthProvider>
                <Outlet/>
            </AuthProvider>
            <TanStackRouterDevtools position="bottom-right"/>
        </>
    )
}
