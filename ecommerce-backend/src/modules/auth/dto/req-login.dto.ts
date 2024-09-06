import { IsNotEmpty, IsString } from "class-validator";

export class ReqLoginDto {
    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    password: string
}