import DashButton from "../DashButton";
import usePaths from "../../hooks/usePaths";
import {CiLogout} from "react-icons/ci";


export default function LeftNavBar() {
    const paths = usePaths()
    return (
        <nav className={"w-[200px] h-screen bg-white hidden md:flex md:flex-col auto-rows-max gap-4 p-2"}>
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

