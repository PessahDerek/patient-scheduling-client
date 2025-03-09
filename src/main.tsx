import React from 'react'
import ReactDOM from 'react-dom/client'
import {createRouter, RouterProvider} from '@tanstack/react-router'
import {routeTree} from './routeTree.gen'

// core styles are required for all packages
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css'
import '@mantine/carousel/styles.css';

// other css files are required only if
// you are using components from the corresponding package
import '@mantine/dates/styles.css';
// import '@mantine/dropzone/styles.css';
// import '@mantine/code-highlight/styles.css';
// ...
import "./main.css"
import {MantineProvider, Notification} from "@mantine/core";
import myMantineTheme from "./libs/theme/myMantineTheme";
import {CookiesProvider} from "react-cookie";
import AuthProvider from "./context/Auth";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Notifications} from "@mantine/notifications";

// Set up a Router instance
const router = createRouter({
    routeTree,
    defaultPreload: 'intent',
})

// Register things for type-safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

const rootElement = document.getElementById('app')!
const queryClient = new QueryClient()

if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <MantineProvider theme={myMantineTheme}>
            <CookiesProvider defaultSetOptions={{path: "/", secure: true}}>
                <QueryClientProvider client={queryClient}>
                    <Notifications position={"top-right"}/>
                    <RouterProvider router={router}/>
                </QueryClientProvider>
            </CookiesProvider>
        </MantineProvider>
    )
}
