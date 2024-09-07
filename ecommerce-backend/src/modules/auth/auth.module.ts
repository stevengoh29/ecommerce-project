import { Module } from "@nestjs/common";
import { UsersService } from "../users/user.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { SECRET_KEY } from "src/config/application.config";
import { OtpService } from "../otp/otp.service";
import { Otp } from "../otp/entities/otp.entity";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
import { StoreModule } from "../stores/store.module";
import { StoreService } from "../stores/store.service";
import { Store } from "../stores/entities/store.entity";
import { MainCategoryService } from "../categories/main-category.service";
import { MainCategory } from "../categories/entities/main-category.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Otp, Store, MainCategory]),
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions: { expiresIn: '1d' }
        }),
        StoreModule
    ],
    controllers: [AuthController],
    providers: [AuthService, UsersService, OtpService, JwtStrategy, LocalStrategy, StoreService, MainCategoryService],
})

export class AuthModule { }