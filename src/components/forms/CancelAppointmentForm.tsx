import React from "react";
import {Button, Modal, Textarea, Title} from "@mantine/core";
import {useMutation} from "@tanstack/react-query";
import api from "../../libs/axios/axios";
import {notifications} from "@mantine/notifications";
import {errNotification} from "../../libs/methods/short";


interface props {
    cancel: AppCancellationObj,
    setCancel: React.Dispatch<React.SetStateAction<AppCancellationObj>>
}

export default function CancelAppointmentForm({cancel, setCancel}: props) {
    const {mutate, isPending} = useMutation({
            mutationKey: ["cancel-appointment"],
            mutationFn: (e: React.FormEvent<HTMLFormElement>): Promise<{
                message: string
            }> => new Promise((resolve, reject) => {
                e.preventDefault();
                api.post("/app/cancel-appointment", cancel)
                    .then(result => resolve(result.data))
                    .catch(err => reject(err));
            }),
            onSuccess: (res) => {
                notifications.show({title: "Success!", message: res.message})
                setCancel({appointment_id: undefined, reason: ""})
            },
            onError: (err) => {
                notifications.show(errNotification(err))
            }
        }
    )

    return (
        <Modal title={<Title>Cancel appointment</Title>} opened={!!cancel.appointment_id}
               onClose={() => setCancel({appointment_id: undefined, reason: ""})}>
            <form onSubmit={mutate} className={"w-full p-2 grid gap-2"}>
                <Textarea
                    disabled={isPending}
                    label={"Reason for cancellation"}
                    placeholder={"Please explain why you want to cancel"}
                    required
                    value={cancel.reason}
                    onChange={e => setCancel(prev => ({...prev, reason: e.target.value}))}
                />
                <Button loading={isPending} disabled={isPending} type={'submit'} color={'red'}>
                    Cancel appointment
                </Button>
                <Button onClick={() => setCancel({appointment_id: undefined, reason: ""})} variant={'outline'}>
                    Close
                </Button>
            </form>
        </Modal>
    )
}