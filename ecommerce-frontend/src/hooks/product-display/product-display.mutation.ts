import productDisplayService, { ProductDisplayData, SaveProductDisplayPayload, UpdateProductDisplayPayload } from "@/services/products/product-display.service"
import { useMutation } from "@tanstack/react-query"

export const useCreateProductDisplay = () => {
    const exec = async (payload: SaveProductDisplayPayload) => {
        const result = await productDisplayService.create(payload)
        return result
    }

    const mutation = useMutation({
        mutationFn: exec
    })

    return mutation
}

export const useUpdateProductDisplay = (uuid: string) => {
    const exec = async (payload: UpdateProductDisplayPayload) => {
        const result = await productDisplayService.update(uuid, payload)
        return result
    }

    const mutation = useMutation<ProductDisplayData, Error, UpdateProductDisplayPayload>({
        mutationFn: exec
    })

    return mutation
}