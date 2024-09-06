import { API_PATH } from "@/core/api/api-listing";
import ApiService from "@/core/api/api.service";
import { MainCategoryData } from "./main-category.service";
import { ApiResult } from "@/core/types/api-result.type";

export type SubcategoryData = {
    uuid: string
    name: string
    description: string
    mainCategory: string | MainCategoryData
    imagePath: string | File
    isInactive: boolean
}

export type SubCategorySavePayload = {
    name: string
    description: string
    mainCategoryId: string
    imagePath: string | File
    isInactive: boolean
}

class SubCategoryService {
    async getAll(params?: any) {
        const response = await ApiService.get(API_PATH.category.sub.getAll, params)
        return response.data
    }

    async getById(uuid: string) {
        const response = await ApiService.get(API_PATH.category.sub.getById, {}, {}, { uuid })
        return response.data
    }

    async getOptionsByStore(uuid: string): Promise<ApiResult<SubcategoryData[]>> {
        const response = await ApiService.get(API_PATH.category.sub.getByStore, {}, {}, { uuid })
        return response.data
    }

    async getDetailedById(uuid: string) {

    }

    async getFilterStatusOptions() {
        return ['ACTIVE_ONLY', 'INCLUDE_INACTIVE']
    }

    async create(payload: SubCategorySavePayload) {
        const response = await ApiService.post(API_PATH.category.sub.create, payload)
        return response.data
    }

    async update(uuid: string, payload: SubCategorySavePayload) {
        const response = await ApiService.put(API_PATH.category.sub.update, payload, {}, { uuid })
        return response.data
    }

    async delete() {

    }
}

const subCategoryService = new SubCategoryService()
export default subCategoryService