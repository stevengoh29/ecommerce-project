import { ApiResult } from "@/core/types/api-result.type";
import productService, { ProductData, SearchProductParams } from "@/services/products/product.service";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = (params: SearchProductParams) => {
    const exec = async (params?: SearchProductParams) => {
        const result = await productService.getAll(params)
        return result
    }

    const query = useQuery<ApiResult<ProductData[]>>({
        queryKey: ['get-products', params],
        queryFn: () => exec(params)
    })

    return query
}

export const useGetProductByUuid = (uuid: string) => {
    const exec = async (uuid: string) => {
        const result = await productService.getById(uuid)
        return result.data
    }

    const query = useQuery<ProductData>({
        queryKey: ['get-product-by-id', uuid],
        queryFn: () => exec(uuid)
    })

    return query
}