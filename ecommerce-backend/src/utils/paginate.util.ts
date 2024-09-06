import { plainToInstance } from "class-transformer"

const paginate = (classType: any, entityResult: [any[], number], page: number, take: number, skip: number) => {
    const items = plainToInstance(classType, entityResult[0])
    const totalCount = entityResult[1]

    const metadata = {
        currentPage: page,
        currentItemCount: items.length,
        totalPage: Math.ceil(totalCount / take),
        totalItemCount: totalCount,
        itemPerPage: take,
    }

    return [items, metadata]
}

const paginateUtil = {
    paginate
}

export default paginateUtil