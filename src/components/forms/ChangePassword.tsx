import {Button, PasswordInput, Title} from "@mantine/core";
import {useMutation} from "@tanstack/react-query";
import api from "../../libs/axios/axios";
import React, {useRef, useState} from "react";
import {notifications} from "@mantine/notifications";
import {errNotification} from "../../libs/methods/short";


export default function ChangePassword() {
    const ref = useRef<HTMLFormElement>(null);
    const [data, setData] = useState({
        current: "",
        password: "",
        confirm: ""
    })
    const {mutate, isPending} = useMutation({
        mutationKey: ['change-password'],
        mutationFn: async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            return await api.post("/auth/change-password", data)
        },
        onSuccess: ({data}) => {
            notifications.show({title: "Notification!", message: data.message})
            ref.current?.reset()
        },
        onError: (err) => {
            notifications.show(errNotification(err))
        }
    })
    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    return (
        <form
            ref={ref}
            onSubmit={mutate}
            className={"flex-1 w-full h-max min-w-[300px] grid auto-rows-max gap-2 p-3 bg-white rounded-lg"}
        >
            <Title order={4}>Change password</Title>
            <PasswordInput
                label={"Current password"}
                placeholder={"Current password"}
                name={"current"}
                value={data.current}
                onChange={change}
            />
            <PasswordInput
                label={"New password"}
                placeholder={"New password"}
                name={"password"}
                value={data.password}
                onChange={change}
            />
            <PasswordInput
                label={"Confirm password"}
                placeholder={"Confirm new password"}
                name={"confirm"}
                value={data.confirm}
                onChange={change}
            />
            <Button loading={isPending} disabled={isPending} type={'submit'} color={'red'}>
                Change password
            </Button>
        </form>
    )
}

