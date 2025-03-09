import * as React from 'react'
import {createFileRoute, Link} from '@tanstack/react-router'
import {Button, CheckIcon, Image, List, Text, ThemeIcon, Title} from "@mantine/core";
import {BsPersonFill} from "react-icons/bs";

export const Route = createFileRoute('/')({
    component: HomeComponent,
})

function HomeComponent() {
    return (
        <div className="w-full min-h-screen bg-background">
            <nav className={"w-full h-[70px] leading-[70px] z-30 sticky top-0 flex bg-primary text-white"}>
                <div className={"w-[90%] h-max m-auto flex justify-between"}>
                    <Link className={"text-2xl mt-auto mb-auto font-bold"} href={"/"}>M.A.P.S.S</Link>
                    <div className={'flex gap-2'}>
                        <Link to={"/auth/$action"} params={{action: "login"}}><Button
                            leftSection={<BsPersonFill/>}>Account</Button></Link>
                    </div>
                </div>
            </nav>
            <div className={"w-[90%] m-auto text-center space-y-3"}>
                <Image className={"w-full h-[40vh] object-contain"} src={"/img/landing.png"} alt={''}/>
                <div>
                    <Title
                        className={"text-[5vmax] bg-gradient-to-r from-primary to-accent-300 bg-clip-text text-transparent"}>Seamless
                        appointment scheduling</Title>
                    <Text>We strive to provide efficient, organized appointments. This is super beneficial for both
                        parties
                        in more ways than one</Text>
                </div>
                <div className={"w-full md:w-3/4 m-auto"}>
                    <List className={'text-left text-primary-700 w-full'} icon={<ThemeIcon size={'sm'} radius={'lg'}>
                        <CheckIcon size={12} className={'text-white text-[12px]'}/>
                    </ThemeIcon>}>
                        <List.Item>Doctors only see enough patients they can manage</List.Item>
                        <List.Item>Eliminates appointment clashes</List.Item>
                        <List.Item>Saves time, money and crowding: Patients only come when they are
                            scheduled</List.Item>
                    </List>
                </div>
                <div className={"w-max m-auto gap-2 flex flex-wrap"}>
                    <Link to={"/auth/$action"} params={{action: "login"}}>
                        <Button radius={'xl'}>Sign in</Button>
                    </Link>
                    <Link to={"/auth/$action"} params={{action: "signup"}}>
                        <Button radius={'xl'}>Create account</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
