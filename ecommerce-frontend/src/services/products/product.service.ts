import { API_PATH } from "@/core/api/api-listing"
import ApiService from "@/core/api/api.service"

export type SearchProductParams = {
    page?: number
    size?: number
    name?: string
    subcategoryUuid?: string
    storeUuid?: string
    review?: number
    productSold?: number
}

export type ProductData = {
    uuid: string
    name: string
    description: string
    subcategoryUuid: string
    imageUrl: string
    productVariants: ProductVariantData[]
    additionalItems: AdditionalItemData[]
    store: string
}

export type ProductVariantData = CreateAdditionalItemPayload & {
    uuid: string
}

export type AdditionalItemData = CreateAdditionalItemPayload & {
    uuid: string
}

export type CreateProductPayload = {
    name: string
    description: string
    subcategoryUuid: string
    imageUrl: string
    productVariants: CreateProductVariantPayload[]
    additionalItems: CreateAdditionalItemPayload[]
    productDisplay: string[]
    store: string
}

export type CreateProductVariantPayload = {
    name: string
    description?: string
    sku: string
    image?: string
    price: number
    stock: number
}

export type CreateAdditionalItemPayload = {
    name: string
    price: number
    stock: number
}

class ProductService {
    async getAll(params?: SearchProductParams) {
        const response = await ApiService.get(API_PATH.products.product.getAll, params)
        return response.data
    }

    async getById(uuid: string) {
        const response = await ApiService.get(API_PATH.products.product.getById, {}, {}, { uuid })
        return response.data
    }

    async create(payload: CreateProductPayload) {
        const response = await ApiService.post(API_PATH.products.product.create, payload)
        return response.data
    }

    async update(uuid: string, payload: any) {
        const response = await ApiService.put(API_PATH.products.product.update, payload, {}, { uuid })
        return response.data
    }

    async delete(uuid: string) {
        const response = await ApiService.delete(API_PATH.products.product.delete, {}, { uuid })
        return response.data
    }
}

export default new ProductService()