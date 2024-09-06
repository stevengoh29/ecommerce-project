'use client'

import FlexBox from "@/components/box/flex-box"
import Button from "@/components/button/button"
import Container from "@/components/container/root-wrapper.container"
import SectionContainer from "@/components/container/section-wrapper.container"
import FormTextInput from "@/components/input/form/form-text-input"
import { setCookie } from "@/helpers/cookie.helper"
import FORM_RULES from "@/helpers/form-rules.helper"
import { useRegister } from "@/hooks/auth/auth.mutation"
import { RegisterPayload } from "@/services/auth/auth.service"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type FormValues = {
    username: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    password: string
    confirmPassword: string
}

const RegisterPage = () => {
    const [page, setPage] = useState(1)

    const { handleSubmit, control, reset } = useForm<FormValues>({
        defaultValues: {
            username: 'seller3',
            firstName: 'name',
            lastName: 'name',
            email: 'name@gmail.com',
            phoneNumber: '1234567890',
            password: '123456',
            confirmPassword: '123456'
        }
    })

    const { mutateAsync: register } = useRegister()

    const router = useRouter()

    const handleFirstPageSubmit = (data: FormValues) => {
        // If the validation is successful, move to the second page
        setPage(2)
    }

    const handleFinalSubmit = async (data: FormValues) => {
        if (data.confirmPassword !== data.password) return toast.error('Password and confirm password does not match.')

        const registerPayload: RegisterPayload = {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
            phoneCode: data.phoneNumber.substring(0, 2),
            phoneNumber: data.phoneNumber,
            username: data.username,
            role: 'SELLER'
        }

        const result = await register(registerPayload)
        setCookie('accessToken', result.accessToken, 1)
        setCookie('refreshToken', result.refreshToken, 7)

        router.push('/')
    }

    return (
        <Container title="Register" className="justify-center items-center">
            <SectionContainer className="lg:w-[48rem] lg:px-10 py-10">
                <h2 className="text-2xl font-bold text-center">Register yourself as a seller</h2>
                <form className="my-5" onSubmit={page === 1 ? handleSubmit(handleFirstPageSubmit) : handleSubmit(handleFinalSubmit)}>
                    {
                        page == 1 &&
                        <FlexBox>
                            <FlexBox className="lg:flex-row">
                                <FormTextInput
                                    isRequired
                                    control={control}
                                    name="firstName"
                                    label="First Name"
                                    rules={{ ...FORM_RULES.FIELD_IS_REQUIRED }}
                                />
                                <FormTextInput
                                    control={control}
                                    name="lastName"
                                    label="Last Name"
                                />
                            </FlexBox>

                            <FormTextInput
                                control={control}
                                name="username"
                                label="Username"
                            />

                            <FormTextInput
                                control={control}
                                isRequired
                                name="email"
                                label="Email"
                                rules={{ ...FORM_RULES.FIELD_IS_EMAIL, ...FORM_RULES.FIELD_IS_REQUIRED }}
                            />

                            <FormTextInput
                                control={control}
                                name="phoneNumber"
                                label="Phone Number"
                            />
                        </FlexBox>
                    }

                    {page == 2 &&
                        <FlexBox>
                            <FormTextInput
                                control={control}
                                name="password"
                                label="Password"
                                isRequired
                                type='password'
                            />

                            <FormTextInput
                                control={control}
                                name="confirmPassword"
                                label="Confirm Password"
                                isRequired
                                type='password'
                            />
                        </FlexBox>
                    }

                    <div className="flex flex-col gap-3 mt-5">
                        <Button type="submit" label={page === 1 ? "Next" : "Submit"} className={'w-full'} onClick={page === 1 ? handleSubmit(handleFirstPageSubmit) : handleSubmit(handleFinalSubmit)} />
                        <Button label="Back" className={'w-full'} variant="outlined" onClick={page === 1 ? () => router.push('/login') : () => setPage(1)} />
                    </div>
                </form>
            </SectionContainer>
        </Container>
    )
}

export default RegisterPage