import React, {createContext, useEffect} from "react";
import {useLocation, useNavigate} from "@tanstack/react-router";
import {useStore} from "zustand/react";
import AuthStore from "../stores/AuthStore";
import {notifications} from "@mantine/notifications";

interface AuthDataObj {
    loggedIn: boolean,
    role: UserRole
}

export const AuthContext = createContext({})

export default function AuthProvider({children}: { children: React.ReactNode }) {
    const {href} = useLocation();
    const navigate = useNavigate()
    const {loggedIn, token} = useStore(AuthStore)


    useEffect(() => {
        const lacksCredentials = !loggedIn || !token
        const wrongPaths = href !== "/" && href !== "/auth/login" && href !== "/auth/signup"
        if (lacksCredentials && wrongPaths) {
            notifications.show({
                title: "Authentication!",
                message: "We're going to redirect you to login page!",
                color: 'orange',
                loading: true
            })
            setTimeout(() => {
                navigate({to: "/auth/$action", params: {action: "login"}})
                    .catch(err => {
                        console.error(err)
                    })
            }, 3000)
        }
    }, [loggedIn, token, href]);


    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    )
}

