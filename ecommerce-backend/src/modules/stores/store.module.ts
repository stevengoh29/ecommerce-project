import { Module } from "@nestjs/common";
import { StoreController } from "./store.controller";
import { StoreService } from "./store.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Store } from "./entities/store.entity";
import { StoreCoupon } from "../coupons/entities/store-coupon.entity";
import { User } from "../users/entities/user.entity";
import { UsersModule } from "../users/user.module";
import { UsersService } from "../users/user.service";
import { MainCategory } from "../categories/entities/main-category.entity";
import { MainCategoryService } from "../categories/main-category.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Store, StoreCoupon, User, MainCategory]),
        UsersModule,
    ],
    controllers: [StoreController],
    providers: [StoreService, UsersService, MainCategoryService]
})
export class StoreModule { }