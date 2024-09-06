import productService, { CreateProductPayload } from "@/services/products/product.service"
import { useMutation } from "@tanstack/react-query"

export const useCreateProduct = () => {
    const exec = async (payload: CreateProductPayload) => {
        const result = await productService.create(payload)
        return result
    }

    return useMutation({
        mutationFn: exec
    })
}