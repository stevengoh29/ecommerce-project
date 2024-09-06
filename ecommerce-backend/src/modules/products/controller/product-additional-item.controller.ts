import { Body, Controller, Delete, Get, Param, Post, Put, Res, ValidationPipe } from "@nestjs/common";
import { Response } from 'express';
import { ResponseUtil } from "src/utils/response.util";
import { ProductAdditionalItemService } from "../services/product-additional-item.service";
import { CreateAdditionalItemDto, SaveAdditionalItemDto } from "../dto/create-product.dto";
import { plainToInstance } from "class-transformer";
import { ProductAdditionalItem } from "../entities/product-additional-item.entity";

@Controller('product/:productUuid/additional-item')
export class ProductAdditionalItemController {
    private readonly builder = new ResponseUtil()

    constructor(
        private readonly productAdditionalItemService: ProductAdditionalItemService
    ) { }

    @Get()
    async get(
        @Param('productUuid') productUuid: string,
        @Res() res: Response
    ) {
        const result = await this.productAdditionalItemService.get(productUuid)
        return this.builder.buildResponse(res, result)
    }

    @Get(':uuid')
    async getByUuid(
        @Param('productUuid') productUuid: string,
        @Param('uuid') uuid: string,
        @Res() res: Response
    ) {
        const result = await this.productAdditionalItemService.getById(productUuid, uuid)
        return this.builder.buildResponse(res, plainToInstance(ProductAdditionalItem, result))
    }


    @Post()
    async create(
        @Param('productUuid') productUuid: string,
        @Body(new ValidationPipe()) body: CreateAdditionalItemDto,
        @Res() res: Response
    ) {
        const result = await this.productAdditionalItemService.create(productUuid, body)
        return this.builder.buildResponse(res, result)
    }

    @Put(':uuid')
    async update(
        @Param('productUuid') productUuid: string,
        @Param('uuid') uuid: string,
        @Body(new ValidationPipe()) body: SaveAdditionalItemDto,
        @Res() res: Response
    ) {
        const result = await this.productAdditionalItemService.update(productUuid, uuid, body)
        return this.builder.buildResponse(res, result)
    }

    @Delete(':uuid')
    async delete(
        @Param('productUuid') productUuid: string,
        @Param('uuid') uuid: string,
        @Res() res: Response
    ) {
        const result = await this.productAdditionalItemService.delete(productUuid, uuid)
        return this.builder.buildResponse(res, result)
    }
}