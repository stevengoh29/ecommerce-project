import subCategoryService, { SubcategoryData, SubCategorySavePayload } from "@/services/categories/sub-category.service"
import { useMutation } from "@tanstack/react-query"

export const useCreateSubCategory = () => {
    const exec = async (payload: SubCategorySavePayload) => {
        const response = await subCategoryService.create(payload)
        return response
    }

    const mutation = useMutation<SubcategoryData, Error, SubCategorySavePayload>({
        mutationFn: exec
    })

    return mutation
}

export const useUpdateSubCategory = (uuid: string) => {
    const exec = async (payload: SubCategorySavePayload) => {
        const response = await subCategoryService.update(uuid, payload)
        return response
    }

    const mutation = useMutation<SubcategoryData, Error, SubCategorySavePayload>({
        mutationFn: exec
    })

    return mutation
}