import { IsNotEmpty, IsString } from "class-validator"

export class ReqResetPassDto {
    @IsString()
    @IsNotEmpty()
    token: string
    
    @IsString()
    @IsNotEmpty()
    newPassword: string
}