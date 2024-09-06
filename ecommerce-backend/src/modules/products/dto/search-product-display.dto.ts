import { BaseSearchDto } from "src/common/dto/base-search.dto";

export class SearchProductDisplayDto extends BaseSearchDto {
    store: string
    name: string
    includeInactive: string
    //TODO: Add More...
}