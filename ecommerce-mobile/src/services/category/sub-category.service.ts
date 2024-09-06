import { API_PATH } from "../../core/api/api-listing"
import ApiService from "../../core/api/api.service"
import { ApiResult } from "../../core/types/api-result.type"
import { SubCategory } from "./category.type"

export type SubCategoryGetParams = {
    page?: number
    size?: number
    name?: string
    includeInactive?: boolean
    mainCategoryUuid?: string
}

const getSubCategories = async (params?: SubCategoryGetParams): Promise<ApiResult<SubCategory[]>> => {
    const response = await ApiService.get(API_PATH.category.sub.getAll, params)
    return response.data
}

const subCategoryService = {
    getSubCategories,
}

export default subCategoryService