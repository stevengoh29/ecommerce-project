import ApiService from "@/core/api/api.service"
import mainCategoryService, { MainCategoryQueryParams } from "@/services/categories/main-category.service"
import { useQuery } from "@tanstack/react-query"

export const useGetMainCategories = (params?: MainCategoryQueryParams) => {
    const exec = async (params?: MainCategoryQueryParams) => {
        const response = await mainCategoryService.getAll(params)
        return response
    }

    const query = useQuery({
        queryKey: ['get-main-categories', params],
        queryFn: () => exec(params)
    })

    return { ...query }
}

export const useGetMainCategory = (uuid: string) => {
    const exec = async (uuid: string) => {
        const response = await mainCategoryService.getById(uuid)

        if (response.data == null) return null
        if (response.data.imagePath == null || response.data.imagePath == '') return response.data

        const imagePath = response.data.imagePath
        const result = await ApiService.getDownloadFile(imagePath)
        return { ...response.data, imagePath: result }
    }

    const query = useQuery({
        queryKey: ['get-main-category', uuid],
        queryFn: () => exec(uuid)
    })

    return query
}

export const useGetMainCategoryOptions = (params?: MainCategoryQueryParams) => {
    const exec = async (params?: MainCategoryQueryParams) => {
        const options = await mainCategoryService.getMainCategoriesOption(params)
        return options
    }

    const query = useQuery({
        queryKey: ['get-main-categories-option'],
        queryFn: () => exec(params)
    })

    return query
}

export const useGetMainCategoryFilterOptions = () => {
    const exec = async () => {
        const options = await mainCategoryService.getFilterStatusOptions()
        return options.length == 0 ? [] : options.map((option) => ({ label: option, value: option }))
    }

    const query = useQuery({
        queryKey: ['get-main-categories-filter-option'],
        queryFn: () => exec()
    })

    return query
}