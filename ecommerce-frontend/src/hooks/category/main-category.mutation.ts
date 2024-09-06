import mainCategoryService, { MainCategoryCreatePayload, MainCategoryData, MainCategoryUpdatePayload } from "@/services/categories/main-category.service"
import { useMutation } from "@tanstack/react-query"

export const useCreateMainCategory = () => {
    const exec = async (payload: MainCategoryCreatePayload) => {
        const response = await mainCategoryService.create(payload)
        return response
    }

    const mutation = useMutation<MainCategoryData, Error, MainCategoryCreatePayload>({
        mutationFn: exec
    })

    return mutation
}

export const useUpdateMainCategory = (uuid: string) => {
    const exec = async (payload: MainCategoryUpdatePayload) => {
        const response = await mainCategoryService.update(uuid, payload)
        return response
    }

    const mutation = useMutation<MainCategoryData, Error, MainCategoryUpdatePayload>({
        mutationFn: exec
    })

    return mutation
}