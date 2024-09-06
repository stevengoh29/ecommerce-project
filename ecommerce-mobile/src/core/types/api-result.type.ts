export type ApiResult<T> = {
    statusCode: number
    message: string
    data: T,
    meta?: Metadata
}

export type Metadata = {
    sort: Sort
    currentPage: string
    currentItemCount: string
    totalPage: string
    totalItemCount: string
    itemPerPage: string
}

export type Sort = {
    direction: 'ASC' | 'DESC'
    column: string
}