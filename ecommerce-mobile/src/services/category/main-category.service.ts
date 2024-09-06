import { API_PATH } from "../../core/api/api-listing"
import ApiService from "../../core/api/api.service"
import { ApiResult } from "../../core/types/api-result.type"
import { MainCategory } from "./category.type"

export enum FetchType {
    TOP5 = 'TOP5',
    ALL = 'ALL'
}

export type MainCategoryGetParams = {
    page: number
    size: number
    name?: string
    includeInactive?: boolean
    mainCategoryUuid?: string
}

const getMainCategories = async (params?: MainCategoryGetParams): Promise<ApiResult<MainCategory[]>> => {
    const response = await ApiService.get(API_PATH.category.main.getAll, params)
    console.log(response.data)
    return response.data
}

const getMainCategoryById = async (uuid: string): Promise<ApiResult<MainCategory>> => {
    const response = await ApiService.get(API_PATH.category.main.getById, { uuid })
    return response.data
}

const mainCategoryService = {
    getMainCategories,
    getMainCategoryById
}

export default mainCategoryService