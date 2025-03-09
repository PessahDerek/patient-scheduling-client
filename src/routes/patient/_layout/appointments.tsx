import {createFileRoute, useLoaderData} from '@tanstack/react-router'
import {Tabs} from "@mantine/core";
import {useEffect, useState} from "react";
import PageLayout from "../../../components/layouts/PageLayout";
import {BiCalendarAlt, BiCalendarEdit} from "react-icons/bi";
import BookAppointment from "../../../components/forms/BookAppointment";
import api from "../../../libs/axios/axios";
import {useStore} from "zustand/react";
import appStore from "../../../stores/AppointmentStore";
import ListPatientApps from "../../../components/tables/ListPatientApps";

export const Route = createFileRoute('/patient/_layout/appointments')({
    component: RouteComponent,
    loader: (): Promise<AppointmentObj[]> => new Promise(async (resolve, reject) => {
        try {
            const patient_id: string | undefined = JSON.parse(localStorage.getItem("auth-store") ?? "{}")['state']?.user.id
            console.log("patient_id", patient_id)
            resolve((await api.get("/app/all-appointments", {
                params: {patient_id: patient_id}
            })).data)
        } catch (e) {
            reject(e);
        }
    }),
    onError: (e) => {
        console.error(e)
    },
})

type AptTabOpts = "appointments" | "booking" | null

function RouteComponent() {
    const [active, setActive] = useState<AptTabOpts>("appointments");
    const data = useLoaderData({from: "/patient/_layout/appointments"})
    const addAppointments = useStore(appStore, state => state.addAppointments)


    useEffect(() => {
        if (data && Array.isArray(data)) {
            addAppointments(data)
        }
    }, []);

    return (
        <PageLayout>
            <Tabs classNames={{list: "bg-white"}} value={active} onChange={(val) => setActive(val as AptTabOpts)}>
                <Tabs.List>
                    <Tabs.Tab leftSection={<BiCalendarAlt/>} value={"appointments"}>Appointments</Tabs.Tab>
                    <Tabs.Tab leftSection={<BiCalendarEdit/>} value={'booking'}>Booking</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value={'appointments'}>
                    <ListPatientApps />
                </Tabs.Panel>
                <Tabs.Panel value={'booking'}>
                    <BookAppointment/>
                </Tabs.Panel>
            </Tabs>
        </PageLayout>
    )
}
