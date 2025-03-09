import {Link, LinkProps} from "@tanstack/react-router";
import {IconType} from "react-icons";
import {Button} from "@mantine/core";


type btnProps = { color?: string };

interface props extends LinkProps {
    text: string;
    Icon?: IconType
    btnProps?: btnProps
    className?: string
}

export default function DashButton({text, Icon, btnProps, className, ...rest}: props) {

    return (
        <Link {...rest} to={rest.to} className={className??""}>
            <Button color={btnProps?.color ?? "blue"} classNames={{label: "w-full text-left"}}
                    className={`w-full ${className ?? ""}`} variant={'light'}
                    leftSection={Icon && <Icon/>}>
                {text}
            </Button>
        </Link>
    )
}