import { Option } from "@/components/input/dropdown-input"
import { API_PATH } from "@/core/api/api-listing"
import ApiService from "@/core/api/api.service"
import { ApiResult } from "@/core/types/api-result.type"

export type MainCategoryData = {
    uuid: string
    name: string
    description: string
    imagePath: string
    isInactive: boolean
}

export type MainCategoryQueryParams = {
    page?: string | number,
    size?: string | number,
}

export type MainCategoryCreatePayload = {
    name: string,
    description: string,
    imagePath: string | File,
    isInactive: boolean
}

export type MainCategoryUpdatePayload = MainCategoryCreatePayload

class MainCategoryService {
    async getAll(params?: MainCategoryQueryParams): Promise<ApiResult<MainCategoryData[]>> {
        const response = await ApiService.get(API_PATH.category.main.getAll, params)
        return response.data
    }

    async getById(uuid: string): Promise<ApiResult<MainCategoryData>> {
        const response = await ApiService.get(API_PATH.category.main.getById, {}, {}, { uuid })
        return response.data
    }

    // For View Screen
    async getDetailedDataById() {

    }

    async getMainCategoriesOption(params?: MainCategoryQueryParams): Promise<Option[]> {
        const response = await this.getAll(params)
        const mainCategories = response.data

        const options = mainCategories.map((mainCategory) => {
            return { label: mainCategory.name, value: mainCategory.uuid }
        })

        return options
    }

    async getFilterStatusOptions() {
        return ['INCLUDE_INACTIVE']
    }

    async create(payload: MainCategoryCreatePayload) {
        const response = await ApiService.post(API_PATH.category.main.create, payload)
        return response.data
    }

    async update(uuid: string, payload: MainCategoryUpdatePayload) {
        const response = await ApiService.put(API_PATH.category.main.update, payload, {}, { uuid })
        return response.data
    }

    async delete(uuid: string) {
        const response = await ApiService.delete(API_PATH.category.main.delete, {}, { uuid })
        return response.data
    }
}

export default new MainCategoryService()