import { API_PATH } from "@/core/api/api-listing"
import ApiService from "@/core/api/api.service"
import { ApiResult } from "@/core/types/api-result.type"

export type SearchProductDisplayParams = {
    page: string
    size: string
    store: string
    name: string
}

export type ProductDisplayData = {
    uuid: string
    name: string
    description: string
    store: string
    isInactive: boolean
}

export type SaveProductDisplayPayload = {
    name: string
    description: string
    store: string
    isInactive?: boolean
}

export type UpdateProductDisplayPayload = Omit<SaveProductDisplayPayload, 'store'>

class ProductDisplayService {
    async getAll(query?: SearchProductDisplayParams): Promise<ApiResult<ProductDisplayData[]>> {
        const response = await ApiService.get(API_PATH.products.productDisplay.getAll, query)
        return response.data
    }

    async getById(uuid: string): Promise<ApiResult<ProductDisplayData>> {
        const response = await ApiService.get(API_PATH.products.productDisplay.getById, {}, {}, { uuid })
        return response.data
    }

    async create(payload: SaveProductDisplayPayload) {
        const response = await ApiService.post(API_PATH.products.productDisplay.create, payload)
        return response.data
    }

    async update(uuid: string, payload: UpdateProductDisplayPayload) {
        const response = await ApiService.put(API_PATH.products.productDisplay.update, payload, {}, { uuid })
        return response.data
    }

    async delete(uuid: string) {
        const response = await ApiService.delete(API_PATH.products.productDisplay.delete, {}, { uuid })
        return response.data
    }
}

export default new ProductDisplayService()