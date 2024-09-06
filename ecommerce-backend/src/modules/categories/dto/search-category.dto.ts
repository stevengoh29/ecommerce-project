export class SearchCategoryDto {
    page: number
    size: number
    name: string
    includeInactive: string
    mainCategoryUuid: string
    mainCategoryQueryType?: 'POPULAR' | 'RECOMMENDED'
}