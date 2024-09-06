import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID, isString } from "class-validator"

export class SaveProductDisplayDto {
    @IsString()
    @IsOptional()
    name: string

    @IsString()
    @IsOptional()
    description: string

    // @IsString()
    // @IsOptional()
    // image: string
}

export class CreateProductDisplayDto extends SaveProductDisplayDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUUID()
    @IsNotEmpty()
    store: string
}

export class AssignProductToDisplayDto {
    @IsArray()
    @IsNotEmpty()
    productUuids: string[]
}