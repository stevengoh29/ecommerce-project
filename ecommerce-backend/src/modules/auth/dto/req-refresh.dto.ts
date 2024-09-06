import { IsNotEmpty, IsString } from "class-validator";

export class ReqRefreshDto {
    @IsString()
    @IsNotEmpty()
    refreshToken: string
}