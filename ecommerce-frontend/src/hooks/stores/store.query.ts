import ApiService from "@/core/api/api.service"
import storeService, { StoreQueryParams } from "@/services/stores/store.service"
import { useQuery } from "@tanstack/react-query"

export const useGetStores = (params?: StoreQueryParams) => {
    const exec = async (params?: StoreQueryParams) => {
        const response = await storeService.getAll(params)
        return response
    }

    const query = useQuery({
        queryKey: ['get-stores'],
        queryFn: () => exec(params)
    })

    return query
}

export const useGetStoreFilterStatusOption = () => {
    return [
        { label: 'ALL', value: 'ALL' },
        { label: 'SHOW_ACTIVE_ONLY', value: 'SHOW_ACTIVE_ONLY' },
        { label: 'SHOW_INACTIVE_ONLY', value: 'SHOW_INACTIVE_ONLY' },
        { label: 'SHOW_SUSPENDED_ONLY', value: 'SHOW_SUSPENDED_ONLY' },
    ]
}

export const useGetDetailedStore = (uuid: string) => {
    const exec = async (uuid: string) => {
        const response = await storeService.getDetailById(uuid)

        if (response.data == null) return null
        if (response.data.imageUrl == null || response.data.imageUrl == '') return response.data

        const imageUrl = response.data.imageUrl
        const result = await ApiService.getDownloadFile(imageUrl as string)
        return { ...response.data, imageUrl: result }
    }

    const query = useQuery({
        queryKey: ['get-detailed-store'],
        queryFn: () => exec(uuid)
    })

    return query
}