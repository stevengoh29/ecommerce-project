import { API_PATH } from "@/core/api/api-listing"
import ApiService from "@/core/api/api.service"
import { UserData } from "../user/user.service"
import { ApiResult } from "@/core/types/api-result.type"
import { MainCategoryData } from "../categories/main-category.service"

export type SaveStorePayload = {
    name: string
    description?: string
    openingHours?: string
    closingHours?: string
    isAlwaysOpen?: boolean
    bannerImageUrl?: string
    imageUrl?: string | null
    owner: string
    mainCategoryUuid: string
}

export type UpdateStorePayload = Omit<SaveStorePayload, 'owner' | 'mainCategoryUuid'>

export type StoreData = {
    name: string
    uuid: string
    description: string
    openingHours: string
    closingHours: string
    isAlwaysOpen: boolean
    bannerImageUrl: string
    imageUrl: string | File | null
    owner: string | UserData
    mainCategory: MainCategoryData
}

export type StoreQueryParams = {

}

class StoreService {
    async getAll(params?: StoreQueryParams): Promise<ApiResult<StoreData[]>> {
        const response = await ApiService.get(API_PATH.stores.getAll, params)
        return response.data
    }

    async getById(uuid: string) {
        const response = await ApiService.get(API_PATH.stores.getById, {}, {}, { uuid })
        return response.data
    }

    async getDetailById(uuid: string): Promise<ApiResult<StoreData>> {
        const response = await ApiService.get(API_PATH.stores.getDetailedById, {}, {}, { uuid })
        return response.data
    }

    async register(payload: SaveStorePayload): Promise<ApiResult<StoreData>> {
        const response = await ApiService.post(API_PATH.stores.create, payload)
        return response.data
    }

    async update(uuid: string, payload: UpdateStorePayload) {
        const response = await ApiService.put(API_PATH.stores.update, payload, {}, { uuid })
        return response.data
    }

    async delete() {

    }
}

export default new StoreService()