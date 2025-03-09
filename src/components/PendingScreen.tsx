import {Text} from "@mantine/core";
import {FaSpinner} from "react-icons/fa6";


export default function PendingScreen() {

    return (
        <div className={"w-full h-[calc(100vh-70px)] md:h-screen flex"}>
            <div className={"w-max h-max gap-2 m-auto grid text-primary-800 auto-cols-max"}>
                <FaSpinner className={'animate-spin text-4xl '}/>
                <Text>Loading</Text>
            </div>
        </div>
    )
}

