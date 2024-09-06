import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Otp } from "./entities/otp.entity";
import { User } from "../users/entities/user.entity";
import { OtpController } from "./otp.controller";
import { OtpService } from "./otp.service";
import { UsersService } from "../users/user.service";
import { AuthService } from "../auth/auth.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Otp, User]),
    ],
    controllers: [OtpController],
    providers: [OtpService, UsersService]
})
export class OtpModule { }