import { IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, IsUUID } from "class-validator"

export class SaveProductDto {
    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsOptional()
    description: string

    @IsUUID()
    @IsOptional()
    subcategoryUuid: string

    @IsString()
    @IsOptional()
    imageUrl: string

    @IsArray()
    @IsOptional()
    productVariants: CreateProductVariantDto[]

    @IsArray()
    @IsOptional()
    additionalItems: CreateAdditionalItemDto[]
}

export class CreateProductDto extends SaveProductDto {
    @IsUUID()
    @IsNotEmpty()
    store: string

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUUID()
    @IsNotEmpty()
    subcategoryUuid: string;
}

export class SaveProductVariantDto {
    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsOptional()
    description: string

    @IsString()
    @IsOptional()
    sku: string

    @IsString()
    @IsOptional()
    image: string

    @IsNumber()
    @IsOptional()
    price: number

    @IsNumber()
    @IsOptional()
    stock: number
}

export class CreateProductVariantDto extends SaveProductVariantDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    sku: string

    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsNumber()
    @IsNotEmpty()
    stock: number
}

export class SaveAdditionalItemDto {
    @IsString()
    @IsOptional()
    name: string

    @IsNumber()
    @IsOptional()
    price: number

    @IsNumber()
    @IsOptional()
    stock: number    
}

export class CreateAdditionalItemDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsNumber()
    @IsNotEmpty()
    stock: number
}