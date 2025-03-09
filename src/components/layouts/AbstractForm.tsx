import React from "react";


export interface FormProps extends React.HtmlHTMLAttributes<HTMLFormElement> {
    children?: React.ReactNode;
}

export default function AbstractForm({children, ...rest}: FormProps) {

    return (
        <form {...rest} className={`grid gap-2 p-2 ${rest.className}`}>
            {children}
        </form>
    )
}