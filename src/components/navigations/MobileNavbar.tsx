import {Burger, Menu, Title} from "@mantine/core";
import {useStore} from "zustand/react";
import AuthStore from "../../stores/AuthStore";
import {useState} from "react";
import usePaths from "../../hooks/usePaths";
import {Link} from "@tanstack/react-router";


export default function MobileNavbar() {
    const user = useStore(AuthStore, state => state.user)
    const [opened, setOpened] = useState(false);
    const paths = usePaths()
    return (
        <nav
            className={"w-full h-[70px] pl-2 pr-2 sticky top-0 z-40 flex md:hidden justify-between text-white bg-primary-800"}>
            <Title className={"mt-auto mb-auto"} order={4}>Hello {user?.name}</Title>
            <Menu opened={opened} onChange={val => setOpened(val)}>
                <Menu.Target>
                    <Burger className={'mt-auto mb-auto'} size={'lg'} color={'white'} opened={opened}/>
                </Menu.Target>
                <Menu.Dropdown>
                    {paths.map((path, index) => (
                        <Menu.Item key={index}>
                            <Link to={path.path}>
                                {path.name}
                            </Link>
                        </Menu.Item>
                    ))}
                </Menu.Dropdown>
            </Menu>
        </nav>
    )
}

