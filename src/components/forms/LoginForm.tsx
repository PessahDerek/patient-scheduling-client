import AbstractForm, {FormProps} from "../layouts/AbstractForm";
import {Button, PasswordInput, TextInput} from "@mantine/core";
import React from "react";

interface props extends FormProps {
    isPending: boolean;
}

export default function LoginForm({isPending, ...rest}: props) {

    return (
        <AbstractForm {...rest}>
            <TextInput name={'contact'} required placeholder={"Phone/email"}/>
            <PasswordInput name={'password'} required placeholder={"Password"}/>
            <Button type={'submit'} disabled={isPending} loading={isPending}>Sign in</Button>
            <Button variant={'light'}>Forgot password</Button>
        </AbstractForm>
    )
}

