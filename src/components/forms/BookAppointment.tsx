import {useStore} from "zustand/react";
import DoctorStore from "../../stores/HospiStore";
import {Carousel} from "@mantine/carousel";
import {Button, Card, Flex, Image, SimpleGrid, Space, Text, TextInput, Title} from "@mantine/core";
import React, {useMemo, useState} from "react";
import {BsCheck, BsSearch, BsSend} from "react-icons/bs";
import {DatePicker} from "@mantine/dates"
import api from "../../libs/axios/axios";
import {useMutation, useQuery} from "@tanstack/react-query";
import dayjs from "dayjs";
import {notifications} from "@mantine/notifications";
import {errNotification} from "../../libs/methods/short";
import {ImWarning} from "react-icons/im";
import {AxiosError} from "axios";

export default function BookAppointment() {
    const docs = useStore(DoctorStore, state => state.doctors)
    const [selected, setSelected] = useState<{
        doc_id?: string;
        date: Date | null;
        timeIn: Date | null;
        schedule: number | null;
    }>({
        doc_id: undefined,
        date: null,
        timeIn: null,
        schedule: null,
    })

    const [searchDoc, setSearchDoc] = useState("")

    const docList = useMemo(() => {
        if (searchDoc.length >= 3) {
            return [...docs.values()].filter(f => (f.firstName + f.lastName).toLowerCase().includes(searchDoc.toLowerCase()))
        }
        if (selected.date && !selected.doc_id) {
            return [...docs.values()].filter(f => f.schedules.find(s => s.workingDay == selected.date?.getDay()))
        }
        return [...docs.values()]
    }, [docs, searchDoc, selected.date, selected.doc_id])

    const excludeDate = (date: Date) => {
        if (selected.doc_id) {
            const doc = docs.get(selected.doc_id)
            if (!doc) return false // will never happen unless a problem has occurred
            if (doc.schedules.length < 1)
                return true
            const docIsIn = doc.schedules.find(f => f.workingDay != date.getDay())
            return !!docIsIn
        }
        return false;
    }

    const {data} = useQuery({
        queryKey: ['docs-appointments', selected.doc_id, selected.date],
        queryFn: async (): Promise<AppointmentObj[]> => {
            if (selected.doc_id && selected.date) {
                return (await api.get(`/app/all-appointments/`, {
                    params: {doc_id: selected.doc_id, date: selected.date},
                })).data
            }
            return []
        },
    })
    const docHours = useMemo(() => {
        if (!selected.doc_id)
            return []
        const doctor = docs.get(selected.doc_id)
        if (!doctor)
            return []
        if (!selected.date)
            return [];
        const schedule = doctor.schedules.find(f => f.workingDay == selected.date?.getDay())
        if (!schedule)
            return []
        const startHour = new Date(schedule.timeIn).getHours()
        const endHour = new Date(schedule.timeOut).getHours()
        const results = []
        for (let i = startHour; i <= endHour; i++) {
            const dateHour = new Date(new Date(selected.date).setHours(i))
            results.push(dateHour)
        }
        return results;
    }, [selected.doc_id, docs, selected.date])

    const {mutate, isPending} = useMutation({
        mutationKey: ['submit-booking'],
        mutationFn: (e: React.FormEvent<HTMLFormElement>): Promise<{
            message: string
        }> => new Promise(async (resolve, reject) => {
            e.preventDefault()
            const ok = Object.values(selected).filter(f => f)

            if (ok.length !== Object.keys(selected).length)
                return reject(new AxiosError("Please fill all required fields!"))
            try {
                resolve((await api.post('/app/book', selected)).data)
            } catch (err) {
                reject(err)
            }
        }),
        onSuccess: ({message}) => {
            notifications.show({title: "Notification!", message: message})
            setSelected({doc_id: undefined, timeIn: null, schedule: null, date: null})
        },
        onError: (err) => {
            notifications.show(errNotification(err))
        }
    })

    return (
        <form onSubmit={mutate} className={"w-full p-2 bg-white flex flex-wrap gap-2"}>
            <SimpleGrid className={"w-full md:w-[300px] auto-rows-max"}>
                <Title order={4}>Select doctor</Title>
                <TextInput
                    value={searchDoc} onChange={e => setSearchDoc(e.target.value)} placeholder={'Find doctor'}
                    leftSection={<BsSearch/>}/>
                {docList.length < 1 &&
                    <div className={"w-full h-[150px] flex"}>
                        <Text className={"m-auto"}>No doctor is
                            available. {selected.date && "Try selecting a different date."}</Text>
                    </div>
                }
                <Carousel
                    slideSize={'25%'}
                    align={'start'}
                    classNames={{indicator: 'bg-red-500'}}
                    p={5} withControls={false}
                    withIndicators={true}
                    orientation={'vertical'}
                >
                    {docList.map(doc =>
                        <Carousel.Slide p={4} key={doc.id}>
                            <Card
                                className={` ${selected.doc_id === doc.id ? 'bg-primary-400' : ''} cursor-pointer h-full hover:shadow-xl `}>
                                <Card.Section className={"bg-white"} h={150}>
                                    <Image
                                        className={"w-full h-full object-contain"}
                                        src={doc.profile ?? `/avis/${doc.gender === 'male' ? 'maledoc' : 'femdoc'}.jpeg`}
                                        alt={`Dr.${doc.firstName}'s profile photo`}/>
                                </Card.Section>
                                <Card.Section className={'grid gap-2'} p={10}>
                                    <Title order={5}>Dr.{doc.firstName} {doc.lastName}</Title>
                                    <Button color={selected.doc_id === doc.id ? 'white' : 'primary'}
                                            onClick={() => setSelected(p => ({
                                                ...p,
                                                doc_id: p.doc_id ? p.doc_id == doc.id ? undefined : doc.id : doc.id
                                            }))}
                                            leftSection={<BsCheck/>} variant={'light'}>
                                        {selected.doc_id === doc.id ? 'Selected' : "Select"}
                                    </Button>
                                </Card.Section>
                            </Card>
                        </Carousel.Slide>
                    )}
                </Carousel>
            </SimpleGrid>
            <SimpleGrid spacing={4} className={'auto-rows-max'}>
                <Flex className={"flex-1 m-auto md:m-0"} gap={"lg"} wrap={"wrap"}>
                    <SimpleGrid cols={1} spacing={2}>
                        <Title order={4}>Select date</Title>
                        <DatePicker
                            allowDeselect
                            excludeDate={excludeDate}
                            value={selected.date}
                            onChange={val => setSelected(p => ({
                                ...p, date: val,
                                schedule: docs.get(p?.doc_id ?? "")?.schedules
                                    .find(f => f.workingDay == val?.getDay())?.id ?? null
                            }))}
                        />
                    </SimpleGrid>
                    <SimpleGrid className={'min-w-[300px] h-max'} cols={1} spacing={4}>
                        <Title order={4}>Select time</Title>
                        <SimpleGrid className={'auto-rows-max'} cols={4} spacing={4}>
                            {docHours.map((hour, i) =>
                                <button
                                    onClick={() => setSelected(prev => ({
                                        ...prev,
                                        timeIn: prev.timeIn == hour ? null : hour
                                    }))}
                                    disabled={!!data?.find(f => new Date(f.timeIn).getHours() == hour.getHours())}
                                    type={'button'}
                                    className={`h-max p-5 border ${selected.timeIn == hour ? "bg-primary-400" : ""} disabled:bg-gray-100 disabled:text-gray-500 disabled:scale-100 disabled:shadow-none cursor-pointer transition-all duration-75 active:shadow-sm hover:shadow-lg hover:scale-[102%] flex border-solid border-slate-300 rounded-md`}
                                    key={i}>
                                    <Text className={"text-sm m-auto"}>{dayjs(hour).format('HH:mm A')}</Text>
                                </button>)
                            }
                        </SimpleGrid>
                    </SimpleGrid>
                </Flex>
                <Space h={'lg'}/>
                <Text size={'sm'}>
                    <ImWarning/>
                    By clicking submit, you are committing to show up at the set time. Please inform the hospital of any
                    changes in time
                </Text>
                <Button
                    type={'submit'}
                    loading={isPending} disabled={isPending} w={300} color={'accent'} variant={'light'}
                    leftSection={<BsSend/>}>
                    Submit
                </Button>
            </SimpleGrid>
        </form>
    )
}

