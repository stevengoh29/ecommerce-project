import { deleteCookie, setCookie } from "@/helpers/cookie.helper"
import { DecodedToken } from "@/middleware"
import authService, { AuthResponse, LoginPayload, RegisterPayload } from "@/services/auth/auth.service"
import { reset, set } from "@/store/reducer/user.reducer"
import { AppDispatch } from "@/store/store"
import { useMutation } from "@tanstack/react-query"
import { jwtDecode } from "jwt-decode"
import { useDispatch } from "react-redux"

export const useLogin = () => {
    const dispatch = useDispatch<AppDispatch>()

    const exec = async (payload: LoginPayload) => {
        const response = await authService.login(payload)
        setCookie('accessToken', response.data.accessToken, 1)
        setCookie('refreshToken', response.data.refreshToken, 7)

        const profile = await authService.getProfile()

        if (profile.data.role == 'SELLER') {
            const storeId = jwtDecode<DecodedToken>(response.data.accessToken).storeId
            dispatch(set({ ...profile.data, storeId }))
        } else {
            dispatch(set(profile.data))
        }

        return response.data
    }

    const mutation = useMutation<AuthResponse, Error, LoginPayload>({
        mutationFn: exec
    })

    return mutation
}

export const useRegister = () => {
    const dispatch = useDispatch<AppDispatch>()

    const exec = async (payload: RegisterPayload) => {
        const response = await authService.register(payload)
        setCookie('accessToken', response.data.accessToken, 1)
        setCookie('refreshToken', response.data.refreshToken, 7)

        const profile = await authService.getProfile()
        dispatch(set(profile.data))

        return response.data
    }

    const mutation = useMutation<AuthResponse, Error, RegisterPayload>({
        mutationFn: exec
    })

    return mutation
}

export const useLogout = () => {
    const dispatch = useDispatch<AppDispatch>()

    const exec = async () => {
        deleteCookie('accessToken')
        deleteCookie('refreshToken')
        dispatch(reset())
        return
    }

    const mutation = useMutation<void, Error>({
        mutationFn: exec
    })

    return mutation
}