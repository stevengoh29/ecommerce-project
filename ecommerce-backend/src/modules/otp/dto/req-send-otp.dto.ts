import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ReqSendOtpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string
}