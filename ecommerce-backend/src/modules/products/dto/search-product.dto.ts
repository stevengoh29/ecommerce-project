export class SearchProductDto {
    page: number
    size: number
    name: string
    subcategoryUuid: string
    storeUuid: string
    review: number
    productSold: number
    sortBy: 'review' | 'productView'
    sortDirection: 'ASC' | 'DESC'
}