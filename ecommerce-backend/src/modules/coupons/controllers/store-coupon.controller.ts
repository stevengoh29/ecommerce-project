import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, ValidationPipe } from "@nestjs/common";
import { Response } from "express";
import { ResponseUtil } from "src/utils/response.util";
import { CreateStoreCouponPayload, SaveStoreCouponPayload } from "../dto/store-coupon-create.dto";
import { StoreCouponQueryParams } from "../dto/store-coupon-query.dto.";
import { StoreCouponService } from "../services/store-coupon.service";

@Controller('coupon/store-coupon')
export class StoreCouponController {
    private readonly builder = new ResponseUtil()

    constructor(
        private readonly storeCouponService: StoreCouponService
    ) { }

    @Get()
    async getAll(
        @Query() query: StoreCouponQueryParams,
        @Res() res: Response
    ) {
        const [coupons, metadata] = await this.storeCouponService.getAll(query)
        return this.builder.buildResponse(res, coupons, metadata)
    }

    @Get(':id')
    async getById(
        @Param('id') id: string,
        @Res() res: Response
    ) {
        const coupon = await this.storeCouponService.getById(id)
        return this.builder.buildResponse(res, coupon)
    }

    @Post()
    async create(
        @Body(new ValidationPipe()) body: CreateStoreCouponPayload,
        @Res() res: Response
    ) {
        const coupon = await this.storeCouponService.create(body)
        return this.builder.buildResponse(res, coupon)
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body(new ValidationPipe()) body: SaveStoreCouponPayload,
        @Res() res: Response
    ) {
        const coupon = await this.storeCouponService.update(id, body)
        return this.builder.buildResponse(res, coupon)
    }

    @Delete(':id')
    async delete(
        @Param('id') id: string,
        @Res() res: Response
    ) {
        const coupon = await this.storeCouponService.delete(id)
        return this.builder.buildResponse(res, coupon)
    }
}