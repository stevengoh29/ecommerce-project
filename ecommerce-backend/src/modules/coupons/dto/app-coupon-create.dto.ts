import { IsArray, IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator"
import { BaseEntity } from "src/common/entity/base.entity";
import { DiscountType } from "../enums/discount-type.enum";

export class SaveAppCouponPayload {
    @IsString()
    name: string

    @IsString()
    description: string

    @IsDate()
    validFrom: Date

    @IsDate()
    validTo: Date

    @IsBoolean()
    isFullyClaimed: boolean

    @IsNumber()
    quotaLimit: number

    @IsBoolean()
    isValidToAll: boolean

    @IsNumber()
    minimumPurchase: number

    @IsNumber()
    maximumDiscountAmount: number

    @IsEnum(DiscountType)
    discountType: DiscountType

    @IsBoolean()
    isInactive: boolean

    @IsArray()
    mainCategoriesUuid: string[]
}

export class CreateAppCouponPayload {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    description: string

    @IsDate()
    @IsNotEmpty()
    validFrom: Date

    @IsDate()
    @IsNotEmpty()
    validTo: Date

    @IsNumber()
    @IsNotEmpty()
    quotaLimit: number

    @IsBoolean()
    @IsNotEmpty()
    isValidToAll: boolean

    @IsNumber()
    @IsNotEmpty()
    minimumPurchase: number

    @IsNumber()
    @IsOptional()
    maximumDiscountAmount: number

    @IsEnum(DiscountType)
    @IsNotEmpty()
    discountType: DiscountType

    @IsArray()
    @IsNotEmpty()
    mainCategoriesUuid: string[]
}