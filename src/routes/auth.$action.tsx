import {createFileRoute, Link, useNavigate, useParams} from '@tanstack/react-router'
import {Text, Title} from "@mantine/core";
import React from "react";
import {useMutation} from "@tanstack/react-query";
import api from "../libs/axios/axios";
import {notifications} from "@mantine/notifications";
import {errNotification} from "../libs/methods/short";
import {useStore} from "zustand/react";
import AuthStore from "../stores/AuthStore";
import SignupForm from "../components/forms/SignupForm";
import LoginForm from "../components/forms/LoginForm";

export const Route = createFileRoute('/auth/$action')({
    component: RouteComponent,
})

function RouteComponent() {
    const {action} = useParams({from: "/auth/$action"})
    const isLogin = action === "login";
    const {saveCredentials} = useStore(AuthStore)
    const navigate = useNavigate();

    const {mutate, isPending} = useMutation({
        mutationKey: ['authentication'],
        mutationFn: async (e: React.FormEvent<HTMLFormElement>): Promise<{
            token: string,
            message: string,
            user: UserObj
        }> => {
            e.preventDefault();
            console.log(e)
            const data = new FormData(e.target as HTMLFormElement);
            const serialized: { [key: string]: string } = {}
            data.forEach((value, key) => serialized[key] = value?.toString())
            return new Promise((resolve, reject) => {
                api.post(`/auth/${isLogin ? "login" : "signup"}`, serialized)
                    .then(res => resolve(res.data))
                    .catch(err => reject(err))
            })
        },
        onSuccess: ({token, message, user}) => {
            saveCredentials(user, token)
            notifications.show({title: "Success!", message: message})
            navigate({to: user.role === 'patient' ? "/patient" : "/docs"})
                .catch(() => {
                })
        },
        onError: (error) => {
            console.log(error)
            notifications.show(errNotification(error))
        }
    })

    return (
        <div className={"w-full min-h-screen flex justify-center items-center"}>
            <div className={"w-max h-max bg-white grid gap-2 p-4 rounded-md"}>
                <Title className={"text-primary-700 text-center"}>M.A.P.S.S</Title>
                <Text className={"text-center"}>Mathare Automatic Patient Scheduling System</Text>

                <div className={"grid gap-2"}>
                    <Title order={2}>{isLogin ? "Sign in" : "Sign up"}</Title>
                    {
                        isLogin
                            ? <LoginForm isPending={isPending} onSubmit={mutate}/>
                            : <SignupForm isPending={isPending} onSubmit={mutate}/>
                    }
                </div>
                <Link to={"/auth/$action"} params={{action: isLogin ? "signup" : "login"}} className={"m-auto"}>
                    {isLogin ? "I dont have an account" : "I have an account"}
                </Link>
            </div>
        </div>
    )
}
