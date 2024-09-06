'use client'

import Button from "@/components/button/button"
import Container from "@/components/container/root-wrapper.container"
import SectionContainer from "@/components/container/section-wrapper.container"
import FormTextInput from "@/components/input/form/form-text-input"
import { setCookie } from "@/helpers/cookie.helper"
import FORM_RULES from "@/helpers/form-rules.helper"
import { useLogin } from "@/hooks/auth/auth.mutation"
import { LoginPayload } from "@/services/auth/auth.service"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

type FormValues = {
    username: string
    password: string
}

const Login = () => {
    const { handleSubmit, control, reset } = useForm<FormValues>({
        defaultValues: {
            username: '',
            password: '',
        }
    })

    const { mutateAsync: login } = useLogin()
    const router = useRouter()

    const onSubmit = async (data: FormValues) => {
        try {
            const loginPayload: LoginPayload = {
                username: data.username,
                password: data.password
            }

            const result = await login(loginPayload)
            // setCookie('accessToken', result.accessToken, 1)
            // setCookie('refreshToken', result.refreshToken, 7)

            router.push('/')
        } catch (error: any) {
            console.error(error)
            if (error instanceof AxiosError) return toast.error(error?.response?.data.message)
            return toast.error(error?.message.toString())
        }
    }

    return (
        <Container className="justify-center items-center">
            <SectionContainer className="lg:min-w-[32rem] lg:px-10 lg:py-10">
                <h2 className="text-2xl font-bold text-center">Sign in to your account</h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-3">
                        <FormTextInput
                            isRequired
                            control={control}
                            name="username"
                            label="Email or Username"
                            rules={{ ...FORM_RULES.FIELD_IS_REQUIRED }}
                        />

                        <FormTextInput
                            isRequired
                            control={control}
                            name="password"
                            type="password"
                            label="Password"
                            rules={{ ...FORM_RULES.FIELD_IS_REQUIRED }}
                        />
                    </div>

                    <div className="flex items-center justify-end">
                        <div className="text-sm">
                            <p className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Button type="submit" label="Login" className={'w-full'} onClick={handleSubmit(onSubmit)} />
                        <Button label="Register" className={'w-full'} variant="outlined" onClick={() => router.push('/register')} />
                    </div>
                </form>
            </SectionContainer>
        </Container>
    )
}

export default Login