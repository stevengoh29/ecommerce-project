import { Option } from "@/components/input/dropdown-input"
import { ApiResult } from "@/core/types/api-result.type"
import productDisplayService, { ProductDisplayData, SearchProductDisplayParams } from "@/services/products/product-display.service"
import { useQuery } from "@tanstack/react-query"

export const useGetProductDisplay = (params?: SearchProductDisplayParams) => {
    const exec = async (params?: SearchProductDisplayParams) => {
        const result = await productDisplayService.getAll(params)
        return result
    }

    const query = useQuery<ApiResult<ProductDisplayData[]>>({
        queryKey: ['get-product-display', params],
        queryFn: () => exec(params)
    })

    return query
}

export const useGetProductDisplayById = (uuid: string) => {
    const exec = async () => {
        const result = await productDisplayService.getById(uuid)
        return result.data
    }

    const query = useQuery<ProductDisplayData>({
        queryKey: ['get-product-display-by-id'],
        queryFn: () => exec()
    })

    return query
}

export const useGetProductDisplayOptionByStoreUuid = (uuid: string) => {
    const exec = async () => {
        const params: SearchProductDisplayParams = {
            page: 1,
            size: 999,
            store: uuid
        }

        const result = await productDisplayService.getAll(params)
        const options = result.data.map((productDisplay) => ({ label: productDisplay.name, value: productDisplay.uuid }))
        return options
    }

    const query = useQuery<Option[]>({
        queryKey: ['get-product-display-options-by-store-uuid'],
        queryFn: () => exec()
    })

    return query
}