import {createFileRoute} from '@tanstack/react-router'
import {Flex, Text} from "@mantine/core";
import {FaSpinner} from "react-icons/fa6";
import {useEffect} from "react";
import {useStore} from "zustand/react";
import AuthStore from "../stores/AuthStore";

export const Route = createFileRoute('/logout')({
    component: RouteComponent,
})

function RouteComponent() {
    const {clearCredentials} = useStore(AuthStore)

    useEffect(() => {
        const timeout = setTimeout(() => {
            clearCredentials()
        }, 3000)

        return () => {
            clearTimeout(timeout)
        }
    }, []);


    return (
        <Flex align={'center'} justify={'center'}>
            <div className={"bg-white p-5 grid justify-center"}>
                <Text>
                    See you later🙋🏽‍♀️
                </Text>
                <FaSpinner color={'accent'} className={"animate-spin"}/>
            </div>
        </Flex>
    )
}
