import {ActionIcon, Menu, Table} from "@mantine/core";
import {useStore} from "zustand/react";
import appStore from "../../stores/AppointmentStore";
import dayjs from "dayjs";
import {FaAngleDown} from "react-icons/fa6";
import {useState} from "react";
import {FaAngleUp} from "react-icons/fa";
import {MdCancel} from "react-icons/md";
import {AiFillPhone} from "react-icons/ai";
import CancelAppointmentForm from "../forms/CancelAppointmentForm";


export default function ListPatientApps() {

    const data = useStore(appStore, state => state.myApps)
    const getColor = (status: AppStatusObj) => {
        switch (status) {
            case "upcoming":
                return "blue"
            case "missed":
                return "red"
            case "complete":
                return "green"
            case "cancelled":
                return "orange"
        }
    }
    const [openMenu, setOpenMenu] = useState<{ [key: number]: boolean }>({});
    const [filters, setFilters] = useState<{
        date?: Date;

    }>({});
    const [cancel, setCancel] = useState<AppCancellationObj>({
        appointment_id: undefined,
        reason: ""
    });
    return (
        <>
            <CancelAppointmentForm cancel={cancel} setCancel={setCancel}/>
            <Table striped classNames={{thead: "bg-white"}}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Doctor</Table.Th>
                        <Table.Th>Date</Table.Th>
                        <Table.Th>Time</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th>Action</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {[...data.values()].map(apps => <Table.Tr key={apps.id}>
                        <Table.Td>{apps.schedule.doctor.simple.name}</Table.Td>
                        <Table.Td>{dayjs(apps.date).format("ddd DD MMM YYYY")}</Table.Td>
                        <Table.Td>{dayjs(apps.timeIn).format("HH:mm A")}</Table.Td>
                        <Table.Td c={getColor(apps.status)}>{apps.status}</Table.Td>
                        <Table.Td>
                            <Menu onChange={val => setOpenMenu({[apps.id]: val})}>
                                <Menu.Target>
                                    <ActionIcon>
                                        {openMenu[apps.id] ? <FaAngleUp/> : <FaAngleDown/>}
                                    </ActionIcon>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item leftSection={<AiFillPhone/>}>Call</Menu.Item>
                                    <Menu.Item onClick={() => setCancel(p => ({...p, appointment_id: apps.id}))}
                                               c={'red'}
                                               leftSection={<MdCancel/>}>Cancel</Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </Table.Td>
                    </Table.Tr>)}
                </Table.Tbody>
            </Table>
        </>
    )
}

