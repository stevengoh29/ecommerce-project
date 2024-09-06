import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StoreCoupon } from "../coupons/entities/store-coupon.entity";
import { User } from "../users/entities/user.entity";
import { UsersModule } from "../users/user.module";
import { UsersService } from "../users/user.service";
import { UploadController } from "./upload.controller";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

@Module({
    imports: [MulterModule.register({
        storage: diskStorage({
            destination: '/app/uploads',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                callback(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
            },
        }),
    }),],
    controllers: [UploadController],
    providers: []
})
export class UploadModule { }