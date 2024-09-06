import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator"

class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsOptional()
    description: string

    @IsOptional()
    imagePath: string

    @IsBoolean()
    @IsOptional()
    isInactive: boolean
}

export class CreateMainCategoryDto extends CreateCategoryDto { }

export class CreateSubCategoryDto extends CreateCategoryDto {
    @IsUUID()
    @IsNotEmpty()
    mainCategoryId: string
}