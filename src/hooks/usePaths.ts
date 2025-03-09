import {useMemo} from "react";
import {useStore} from "zustand/react";
import AuthStore from "../stores/AuthStore";
import {useRouter} from "@tanstack/react-router";
import {capitalize} from "../libs/methods/short";

export default function usePaths() {
    const user = useStore(AuthStore, state => state.user?.role)
    const routers = useRouter()

    return useMemo(() => {
        if (user) {
            const key = user === 'doctor' ? 'docs' : 'patient'
            const rawPaths = Object.keys(routers.routesByPath).filter(f => f.includes(key))
            return rawPaths.map(path => {
                if (path === `/${key}`)
                    return {name: "Dashboard", path: path}
                return {name: capitalize(path.replace(`/${key}/`, "")), path: path}
                // @ts-ignore
            }).sort((a, b) => a.path.length - b.path.length)
        }
        return []
    }, [user]);
}

