import productDisplayService, { ProductDisplayData, SaveProductDisplayPayload, UpdateProductDisplayPayload } from "@/services/products/product-display.service"
import { ProductData } from "@/services/products/product.service"
import { useMutation } from "@tanstack/react-query"

export const useCreateProductDisplay = () => {
    const exec = async (payload: SaveProductDisplayPayload) => {
        if (payload.products && payload.products.length > 0) payload.products = (payload.products as ProductData[]).map((product) => product.uuid)

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
        if (payload.products && payload.products.length > 0) payload.products = (payload.products as ProductData[]).map((product) => product.uuid)

        const result = await productDisplayService.update(uuid, payload)
        return result
    }

    const mutation = useMutation<ProductDisplayData, Error, UpdateProductDisplayPayload>({
        mutationFn: exec
    })

    return mutation
}