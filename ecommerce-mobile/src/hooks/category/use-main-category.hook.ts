import { useEffect, useState } from "react"
import { ApiResult } from "../../core/types/api-result.type"
import { MainCategory } from "../../services/category/category.type"
import mainCategoryService, { FetchType, MainCategoryGetParams } from "../../services/category/main-category.service"

export const useGetMainCategories = (fetchType?: FetchType) => {
    const [fetchMainCategoryResult, setFetchMainCategoryResult] = useState<ApiResult<MainCategory[] | undefined>>()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isFetchingNextPage, setIsFetchingNextPage] = useState(false)

    const [isError, setIsError] = useState<boolean>(false)

    const getMainCategories = async () => {
        try {
            setIsLoading(true)

            const params: MainCategoryGetParams | any = {
                page: 1,
                size: 10
            }

            if (fetchType == FetchType.TOP5) params.size = 5

            const response = await mainCategoryService.getMainCategories(params)
            setFetchMainCategoryResult(response)
        } catch (error) {
            console.error(error)
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }

    const fetchNextPage = async () => {
        try {
            setIsFetchingNextPage(true)

            if (fetchMainCategoryResult?.meta?.currentPage == fetchMainCategoryResult?.meta?.totalPage) {
                setIsFetchingNextPage(false)
                return
            }

            const params: MainCategoryGetParams = {
                page: (Number.parseInt(fetchMainCategoryResult?.meta?.currentPage ?? '1')) + 1,
                size: Number.parseInt(fetchMainCategoryResult?.meta?.itemPerPage ?? '5')
            }

            const response = await mainCategoryService.getMainCategories(params)
            setFetchMainCategoryResult({
                ...response,
                data: [...(fetchMainCategoryResult?.data || []), ...response.data],
                meta: response.meta
            })
        } catch (error) {
            console.error(error)
        } finally {
            setIsFetchingNextPage(false)
        }
    }

    useEffect(() => {
        getMainCategories()
    }, [])

    return {
        mainCategories: fetchMainCategoryResult?.data,
        sortType: fetchMainCategoryResult?.meta?.sort ?? { column: 'CREATED_AT', direction: 'DESC' },
        isLoading,
        refetch: getMainCategories,
        fetchNextPage,
        isFetchingNextPage
    }
}