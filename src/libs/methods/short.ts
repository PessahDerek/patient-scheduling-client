import {AxiosError} from "axios";


export const errNotification = (error: Error | unknown): { title: "Error!", message: string, color: string } => {
    const message = error instanceof AxiosError ?
        error.response?.data?.message ? error.response?.data?.message : error.response?.statusText ?? error.message
        : "Something went wrong!";

    return {title: "Error!", message: message, color: 'red'};
}

export const capitalize = (str: string) => {
    return `${str[0]?.toUpperCase() ?? ""}${str?.slice(1).toLowerCase()}`
}