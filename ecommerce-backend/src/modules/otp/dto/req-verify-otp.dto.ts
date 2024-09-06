import { IsNotEmpty, IsString, Length } from "class-validator"

export class ReqVerifyOtpDto {
    @IsString()
    @IsNotEmpty()
    token: string

    @IsString()
    @IsNotEmpty()
    @Length(4)
    otp: string
}