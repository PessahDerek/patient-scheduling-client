import DashButton from "../DashButton";
import usePaths from "../../hooks/usePaths";
import {CiLogout} from "react-icons/ci";
import {Avatar, Text, Title} from "@mantine/core";
import {useStore} from "zustand/react";
import authStore from "../../stores/AuthStore";
import {capitalize} from "../../libs/methods/short";


export default function LeftNavBar() {
    const paths = usePaths()
    const user = useStore(authStore, state => state.user)
    const avi = user ? `/avis/${user.role == 'doctor' ? 'doctor.jpg' : 'birds1.jpg'}` : undefined
    return (
        <nav className={"w-[200px] h-screen bg-white hidden md:flex md:flex-col auto-rows-max gap-4 p-2"}>
            <div className={'w-full p-3 cursor-pointer rounded-lg gap-2 flex flex-wrap bg-primary-950'}>
                <Avatar src={avi} className={"w-[50px] h-[50px] m-auto rounded-full"} />
                <div className={"flex-1 text-white grid auto-rows-max gap-2"}>
                    <Title className={'truncate'} order={5}>{user?.name}</Title>
                    <Text>{capitalize(user?.role ?? "")}</Text>
                </div>
            </div>
            <div className={"grid gap-2 auto-rows-max w-full"}>
                {paths.map((path, index) => (
                    // @ts-ignore
                    <DashButton key={index} text={path.name} to={path.path}/>
                ))}
            </div>
            <DashButton Icon={CiLogout} className={'mt-auto'} btnProps={{color: 'red'}} text={"Logout"} to={"/logout"}/>
        </nav>
    )
}

