import { getCookies, setCookie } from "@/helpers/cookie.helper"
import authService from "@/services/auth/auth.service"
import storeService, { SaveStorePayload } from "@/services/stores/store.service"
import { useMutation } from "@tanstack/react-query"

export const useCreateStore = () => {
    const exec = async (payload: SaveStorePayload) => {
        await storeService.register(payload)

        // Refresh Token
        const refreshToken = getCookies('refreshToken')
        const refreshTokenResult = await authService.refresh({ refreshToken })
        const accessToken = refreshTokenResult.data.accessToken
        setCookie('accessToken', accessToken, 1)

        return
    }

    const mutation = useMutation<void, Error, SaveStorePayload>({
        mutationFn: exec
    })

    return mutation
}