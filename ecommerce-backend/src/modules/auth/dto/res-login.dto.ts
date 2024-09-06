import { IsString } from "class-validator";

export class ResLoginDto {
    accessToken: string
    refreshToken: string
}