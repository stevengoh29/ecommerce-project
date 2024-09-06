import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, ValidationPipe } from "@nestjs/common";
import { ResponseUtil } from "src/utils/response.util";
import { AppCouponService } from "../services/app-coupon.service";
import { AppCouponQueryParams } from "../dto/app-coupon-query.dto";
import { Response } from "express";
import { CreateAppCouponPayload, SaveAppCouponPayload } from "../dto/app-coupon-create.dto";

@Controller('coupon/app-coupon')
export class AppCouponController {
    private readonly builder = new ResponseUtil()

    constructor(
        private readonly appCouponService: AppCouponService
    ) { }

    @Get()
    async getAll(
        @Query() query: AppCouponQueryParams,
        @Res() res: Response
    ) {
        const [coupons, metadata] = await this.appCouponService.getAll(query)
        return this.builder.buildResponse(res, coupons, metadata)
    }

    @Get(':id')
    async getById(
        @Param('id') id: string,
        @Res() res: Response
    ) {
        const coupon = await this.appCouponService.getById(id)
        return this.builder.buildResponse(res, coupon)
    }

    @Post()
    async create(
        @Body(new ValidationPipe()) body: CreateAppCouponPayload,
        @Res() res: Response
    ) {
        const coupon = await this.appCouponService.create(body)
        return this.builder.buildResponse(res, coupon)
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body(new ValidationPipe()) body: SaveAppCouponPayload,
        @Res() res: Response
    ) {
        const coupon = await this.appCouponService.update(id, body)
        return this.builder.buildResponse(res, coupon)
    }

    @Delete(':id')
    async delete(
        @Param('id') id: string,
        @Res() res: Response
    ) {
        const coupon = await this.appCouponService.delete(id)
        return this.builder.buildResponse(res, coupon)
    }
}