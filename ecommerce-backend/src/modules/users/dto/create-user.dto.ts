import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Gender } from "../enum/gender.enum";
import { UserType } from "../enum/user-type.enum";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    phoneCode: string;

    @IsEnum(Gender)
    @IsOptional()
    gender: Gender;

    @IsString()
    @IsOptional()
    image: string;

    @IsEnum(UserType)
    @IsOptional()
    userType: UserType;
}