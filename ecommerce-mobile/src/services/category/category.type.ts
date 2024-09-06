export type MainCategory = {
    uuid: string
    imagePath: string
    imageUrl: string
    name: string
    description: string
    isInactive: string
    createdAt: string
    updatedAt: string
    deletedAt: string
}

export type SubCategory = {
    uuid: string
    imagePath: string
    imageUrl: string
    name: string
    description: string
    isInactive: string
    createdAt: string
    updatedAt: string
    deletedAt: string
    mainCategory: MainCategory
}