import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, ValidationPipe } from "@nestjs/common";
import { ResponseUtil } from "src/utils/response.util";
import { AssignProductToDisplayDto, CreateProductDisplayDto, SaveProductDisplayDto } from "../dto/create-product-display.dto";
import { ProductDisplayService } from "../services/product-display.service";
import { Response } from 'express';
import { SearchProductDisplayDto } from "../dto/search-product-display.dto";
import { plainToInstance } from "class-transformer";
import { ProductDisplay } from "../entities/product-display.entity";

@Controller('product-display')
export class ProductDisplayController {
    private readonly builder = new ResponseUtil()

    constructor(
        private readonly productDisplayService: ProductDisplayService
    ) { }

    @Get()
    async get(
        @Query() query: SearchProductDisplayDto,
        @Res() res: Response
    ) {
        const [result, metadata] = await this.productDisplayService.get(query)
        return this.builder.buildResponse(res, result, metadata)
    }

    @Get(':uuid')
    async getByUuid(
        @Param('uuid') uuid: string,
        @Res() res: Response
    ) {
        const result = await this.productDisplayService.getById(uuid)
        return this.builder.buildResponse(res, plainToInstance(ProductDisplay, result))
    }


    @Post()
    async create(
        @Body(new ValidationPipe()) body: CreateProductDisplayDto,
        @Res() res: Response
    ) {
        const result = await this.productDisplayService.create(body)
        return this.builder.buildResponse(res, result)
    }

    @Post(':uuid/assign')
    async assignProduct(
        @Param('uuid') uuid: string,
        @Body(new ValidationPipe()) body: AssignProductToDisplayDto,
        @Res() res: Response
    ) {
        const result = await this.productDisplayService.assignProductToDisplay(body, uuid)
        return this.builder.buildResponse(res, result)
    }

    @Put(':uuid')
    async update(
        @Body(new ValidationPipe()) body: SaveProductDisplayDto,
        @Param('uuid') uuid: string,
        @Res() res: Response
    ) {
        const result = await this.productDisplayService.update(uuid, body)
        return this.builder.buildResponse(res, result)
    }

    @Delete(':uuid')
    async delete(
        @Param('uuid') uuid: string,
        @Res() res: Response
    ) {
        const result = await this.productDisplayService.delete(uuid)
        return this.builder.buildResponse(res, result)
    }
}