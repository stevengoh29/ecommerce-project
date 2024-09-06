export type StoreCouponParams = {
    page: string,
    size: string,
    name: string,
    storeUuid: string
}

export type StoreCouponData = {

}

export type StoreCouponPayload = {
    name: string
    description: string
    validFrom: Date | null
    validTo: Date | null
    quotaLimit: number
    isValidToAll: boolean
    minimumPurchase: number
    maximumDiscountAmount: number
    canStack: boolean
    discountType: 'percentage' | 'fixed'
    subcategoryUuids: string[]
    storeUuid: string
}

class StoreCoupon {
    async getAll() {

    }

    async getById(uuid: string) {

    }

    async create() {

    }

    async update(uuid: string, payload: any) {

    }

    async delete(uuid: string) {

    }
}

export default new StoreCoupon()