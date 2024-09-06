import ApiService from "@/core/api/api.service"
import subCategoryService, { SubcategoryData, SubCategorySavePayload } from "@/services/categories/sub-category.service"
import { useQuery } from "@tanstack/react-query"

type QueryParams = {
    page: string
}

export const useGetSubCategories = (params?: QueryParams) => {
    const exec = async (query?: QueryParams) => {
        const response = await subCategoryService.getAll(query)
        return response
    }

    const query = useQuery({
        queryKey: ['get-sub-categories', params],
        queryFn: () => exec(params)
    })

    return { ...query }
}

export const useGetSubcategory = (uuid: string) => {
    const exec = async (uuid: string) => {
        const response = await subCategoryService.getById(uuid)

        if (response.data == null) return null
        if (response.data.imagePath == null || response.data.imagePath == '') return response.data

        const imagePath = response.data.imagePath
        const result = await ApiService.getDownloadFile(imagePath)
        return { ...response.data, imagePath: result }
    }

    const query = useQuery<SubcategoryData, Error>({
        queryKey: ['get-sub-category', uuid],
        queryFn: () => exec(uuid)
    })

    return query
}

export const useGetSubcategoriesOptionByStore = (storeUuid: string) => {
    const exec = async (storeUuid: string) => {
        const response = await subCategoryService.getOptionsByStore(storeUuid)
        const subcategories = response.data.map((subcategory) => ({ label: subcategory.name, value: subcategory.uuid }))
        return subcategories
    }

    const query = useQuery({
        queryKey: ['get-sub-categories', storeUuid],
        queryFn: () => exec(storeUuid)
    })

    return query
}