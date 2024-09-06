import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator"

export class SaveStoreDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsOptional()
    description: string

    @IsString()
    @IsOptional()
    openingHours: string

    @IsString()
    @IsOptional()
    closingHours: string

    @IsBoolean()
    @IsNotEmpty()
    isAlwaysOpen: boolean

    @IsString()
    @IsOptional()
    bannerImageUrl: string

    @IsString()
    @IsOptional()
    imageUrl: string
}

export class CreateStoreDto extends SaveStoreDto {
    @IsUUID()
    @IsNotEmpty()
    owner: string

    @IsUUID()
    @IsNotEmpty()
    mainCategoryUuid: string
}