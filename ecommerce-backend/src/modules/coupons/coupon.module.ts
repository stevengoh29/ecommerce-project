import { Module } from "@nestjs/common";
import { AppCouponService } from "./services/app-coupon.service";
import { StoreCouponService } from "./services/store-coupon.service";
import { AppCouponController } from "./controllers/app-coupon.controller";
import { StoreCouponController } from "./controllers/store-coupon.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppCoupon } from "./entities/app-coupon.entity";
import { StoreCoupon } from "./entities/store-coupon.entity";

@Module({
    imports: [TypeOrmModule.forFeature([AppCoupon, StoreCoupon])],
    controllers: [AppCouponController, StoreCouponController],
    providers: [AppCouponService, StoreCouponService]
})
export class CouponModule { }