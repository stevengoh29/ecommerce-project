import { useEffect, useState } from "react"
import { ApiResult } from "../../core/types/api-result.type"
import { SubCategory } from "../../services/category/category.type"
import subCategoryService, { SubCategoryGetParams } from "../../services/category/sub-category.service"

export const useSubCategories = (mainCategoryId: string) => {
    const [data, setData] = useState<ApiResult<SubCategory[] | undefined>>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const getSubCategories = async () => {
        try {
            // Add MainCategoryId to get related subcategories
            const params: SubCategoryGetParams = {
                mainCategoryUuid: mainCategoryId
            }

            const response = await subCategoryService.getSubCategories(params)
            setData(response)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getSubCategories()
    }, [])

    return { isLoading, subCategories: data?.data, refetch: getSubCategories }
}