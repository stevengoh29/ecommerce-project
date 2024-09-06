import { API_PATH } from "@/core/api/api-listing"
import ApiService from "@/core/api/api.service"
import { ApiResult } from "@/core/types/api-result.type"
import { getCookies } from "@/helpers/cookie.helper"
import { UserData } from "../user/user.service"

export type LoginPayload = {
    username: string
    password: string
}

export type RegisterPayload = {
    firstName: string
    lastName: string
    username: string
    password: string
    email: string
    phoneNumber: string
    phoneCode: string
    image?: string
    role?: 'SELLER'
}

export type RefreshTokenPayload = {
    refreshToken: string
}

export type AuthResponse = {
    accessToken: string
    refreshToken: string
}

export type RefreshTokenResponse = Omit<AuthResponse, 'refreshToken'>

class AuthService {
    async login(payload: LoginPayload): Promise<ApiResult<AuthResponse>> {
        const response = await ApiService.post(API_PATH.auth.login, payload)
        return response.data
    }

    async getProfile(): Promise<ApiResult<UserData>> {
        const response = await ApiService.get(API_PATH.auth["get-profile"])
        return response.data
    }

    async register(payload: RegisterPayload): Promise<ApiResult<AuthResponse>> {
        const response = await ApiService.post(API_PATH.auth.register, payload)
        return response.data
    }

    async refresh(payload: RefreshTokenPayload): Promise<ApiResult<RefreshTokenResponse>> {
        const response = await ApiService.post(API_PATH.auth.refresh, payload)
        return response.data
    }

    async logout() {

    }
}

export default new AuthService()