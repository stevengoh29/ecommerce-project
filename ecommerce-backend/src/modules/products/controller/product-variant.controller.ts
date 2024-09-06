import { Body, Controller, Delete, Get, Param, Post, Put, Res, ValidationPipe } from "@nestjs/common";
import { Response } from 'express';
import { ResponseUtil } from "src/utils/response.util";
import { CreateProductVariantDto, SaveProductVariantDto } from "../dto/create-product.dto";
import { ProductVariantService } from "../services/product-variant.service";
import { plainToInstance } from "class-transformer";
import { ProductVariant } from "../entities/product-variant.entity";

@Controller('product/:productUuid/variant')
export class ProductVariantController {
    private readonly builder = new ResponseUtil()

    constructor(
        private readonly productVariantService: ProductVariantService
    ) { }

    @Get()
    async get(
        @Param('productUuid') productUuid: string,
        @Res() res: Response
    ) {
        const result = await this.productVariantService.get(productUuid)
        return this.builder.buildResponse(res, result)
    }

    @Get(':uuid')
    async getByUuid(
        @Param('productUuid') productUuid: string,
        @Param('uuid') uuid: string,
        @Res() res: Response
    ) {
        const result = await this.productVariantService.getById(productUuid, uuid)
        return this.builder.buildResponse(res, plainToInstance(ProductVariant, result))
    }


    @Post()
    async create(
        @Param('productUuid') productUuid: string,
        @Body(new ValidationPipe()) body: CreateProductVariantDto,
        @Res() res: Response
    ) {
        const result = await this.productVariantService.create(productUuid, body)
        return this.builder.buildResponse(res, result)
    }

    @Put(':uuid')
    async update(
        @Param('productUuid') productUuid: string,
        @Param('uuid') uuid: string,
        @Body(new ValidationPipe()) body: SaveProductVariantDto,
        @Res() res: Response
    ) {
        const result = await this.productVariantService.update(productUuid, uuid, body)
        return this.builder.buildResponse(res, result)
    }

    @Delete(':uuid')
    async delete(
        @Param('productUuid') productUuid: string,
        @Param('uuid') uuid: string,
        @Res() res: Response
    ) {
        const result = await this.productVariantService.delete(productUuid, uuid)
        return this.builder.buildResponse(res, result)
    }
}