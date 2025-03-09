import React from "react";
import LeftNavBar from "../navigations/LeftNavBar";
import MobileNavbar from "../navigations/MobileNavbar";


interface props extends React.HTMLProps<HTMLDivElement> {
    children?: React.ReactNode
}

export default function DashboardLayout({children, ...rest}: props) {

    return (
        <div {...rest} className={`w-full min-h-[calc(100vh-70px)] md:h-screen block md:flex ${rest.className}`}>
            <LeftNavBar/>
            <MobileNavbar/>
            <div className={"flex-1 md:overflow-y-auto"}>
                {children}
            </div>
        </div>
    )
}

