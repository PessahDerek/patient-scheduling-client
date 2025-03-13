import React from "react";
import {Title} from "@mantine/core";
import {useLocation} from "@tanstack/react-router";
import {capitalize} from "../../libs/methods/short";

interface props extends React.HTMLProps<HTMLDivElement> {
    children: React.ReactNode;
    pageTitle?: string;
}

export default function PageLayout({children, pageTitle, ...rest}: props) {
    const {href} = useLocation();
    return (
        <div {...rest} data-aos={'zoom-in'} className={`w-full h-full p-2 ${rest.className}`}>
            <div className={"w-full h-[50px] border-b border-solid flex justify-start border-b-slate-300"}>
                <Title className={"mt-auto mb-auto"} order={3}>
                    {capitalize(pageTitle ?? href.split("/").at(-1) ?? "")}</Title>
            </div>
            <div className={"w-full h-full"}>
                {children}
            </div>
        </div>
    )
}

