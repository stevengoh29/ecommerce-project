import { API_PATH } from "@/core/api/api-listing"
import ApiService from "@/core/api/api.service"
import { ApiResult } from "@/core/types/api-result.type"

export type UserData = {
    uuid: string
    firstName: string
    lastName: string
    imageUrl: string
    username: string
    phoneCode: string
    phoneNumber: string
    role?: string
    storeId?: string
}

export type UserQueryParams = {
    page?: string | number
    size?: string | number
}

class UserService {
    async getAll(params?: any): Promise<ApiResult<UserData[]>> {
        const response = await ApiService.get(API_PATH.users.getAll)
        return response.data
    }

    async getStatusEnum() {
        return ['ACTIVE', 'INACTIVE', 'SUSPENDED']
    }

    async getById(userId: string) {

    }

    async edit(userId: string, body: any) {

    }

    async delete(userId: string) {

    }
}

export default new UserService()