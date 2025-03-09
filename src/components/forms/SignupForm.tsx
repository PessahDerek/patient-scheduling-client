import AbstractForm, {FormProps} from "../layouts/AbstractForm";
import {Button, PasswordInput, TextInput} from "@mantine/core";
import React from "react";

interface props extends FormProps {
    isPending: boolean;
}

export default function SignupForm({isPending, ...rest}: props) {

    return (
        <AbstractForm {...rest}>
            <div className={"grid md:grid-cols-2 gap-2"}>
                <TextInput name={'firstName'} required placeholder={"First Name"}/>
                <TextInput name={'lastName'} required placeholder={"Last Name"}/>
                <TextInput name={'email'} type={'email'} required placeholder={"Email"}/>
                <TextInput name={'phone'} type={'tel'} required placeholder={"Phone"}/>
                <PasswordInput name={'password'} required placeholder={"Password"}/>
                <PasswordInput name={'confirm'} required placeholder={"Confirm"}/>
            </div>
            <Button type={'submit'} disabled={isPending} loading={isPending}>
                Create account
            </Button>
        </AbstractForm>
    )
}

