import {Button, Select, TextInput, Title} from "@mantine/core";
import React, {useState} from "react";
import {MdCancel, MdUpdate} from "react-icons/md";
import {BsPencil} from "react-icons/bs";
import {useMutation, useQuery} from "@tanstack/react-query";
import api from "../../libs/axios/axios";
import {notifications} from "@mantine/notifications";
import {errNotification} from "../../libs/methods/short";


export default function ProfileForm() {
    const [data, setData] = useState<{ [key: string]: string }>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "unknown"
    })
    const [edit, setEdit] = useState<boolean>(false);
    const {mutate, isPending, isSuccess} = useMutation({
        mutationKey: ['profile-update'],
        mutationFn: async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            console.log("data: ", data);
            return await api.post("/app/profile", data)
        },
        onSuccess: (result) => {
            notifications.show({title: "Success!", message: result.data.message})
        },
        onError: (err) => {
            notifications.show(errNotification(err))
        }
    })
    useQuery({
        queryKey: ['profile-data', isSuccess],
        queryFn: () => {
            api.get(`/app/profile`)
                .then(res => setData(p => ({...p, ...res.data})))
                .catch(err => {
                    notifications.show(errNotification(err))
                })
        },
    });

    const change = (e: React.ChangeEvent<HTMLInputElement> | (string | null)) => {
        const value = typeof e === 'string' ? e : e === null ? 'unknown' : e.target.value
        const key = e == null || typeof e === 'string' ? 'gender' : e.target.name
        setData(prev => ({...prev, [key]: value}))
    }

    return (
        <form onSubmit={mutate} className={"flex-1 h-max grid auto-rows-max gap-2 p-2 bg-white rounded-lg"}>
            <Title order={4}>Personal info</Title>
            <TextInput
                label={'First name'}
                name={'first'}
                placeholder={'First name'}
                disabled={!edit}
                value={data.firstName}
                onChange={change}
            />
            <TextInput
                label={'Last name'}
                name={'lastName'}
                placeholder={'Last name'}
                disabled={!edit}
                value={data.lastName}
                onChange={change}
            />
            <TextInput
                label={'Email'}
                name={'email'}
                placeholder={'Email'}
                disabled={!edit}
                value={data.email}
                onChange={change}
            />
            <TextInput
                label={'Phone'}
                name={'phone'}
                placeholder={'Phone'}
                disabled={!edit}
                value={data.phone}
                onChange={change}
            />
            <Select
                label={'Gender'}
                name={'gender'}
                placeholder={'Gender'}
                disabled={!edit}
                value={data.gender}
                onChange={change}
                data={[{label: "Male", value: 'male'}, {label: "Female", value: 'female'}]}
            />
            {edit ?
                <div className={'flex flex-wrap gap-2'}>
                    <Button loading={isPending} disabled={isPending} type={'submit'} leftSection={<MdUpdate/>}>
                        Update
                    </Button>
                    <Button disabled={isPending} onClick={() => setEdit(false)} variant={'light'}
                            leftSection={<MdCancel/>} color={'red'}>
                        Cancel
                    </Button>
                </div> :
                <Button leftSection={<BsPencil/>} className={"w-max"} onClick={() => setEdit(!edit)}>
                    Edit
                </Button>
            }
        </form>
    )
}

