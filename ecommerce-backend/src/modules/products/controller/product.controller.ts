import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from "@nestjs/common";
import { Response } from 'express';
import { ValidationPipe } from "src/pipes/validation.pipe";
import { ResponseUtil } from "src/utils/response.util";
import { CreateProductDto, SaveProductDto } from "../dto/create-product.dto";
import { ProductService } from "../services/product.service";
import { SearchProductDto } from "../dto/search-product.dto";
import { plainToInstance } from "class-transformer";
import { Product } from "../entities/product.entity";

@Controller('product')
export class ProductController {
    private readonly builder = new ResponseUtil()

    constructor(
        private readonly productService: ProductService
    ) { }

    @Get()
    async get(
        @Query() query: SearchProductDto,
        @Res() res: Response
    ) {
        const [result, metadata] = await this.productService.getProduct(query)
        return this.builder.buildResponse(res, result, metadata)
    }

    @Get(':uuid')
    async getByUuid(
        @Param('uuid') uuid: string,
        @Res() res: Response
    ) {
        const result = await this.productService.getProductByUuid(uuid)
        return this.builder.buildResponse(res, plainToInstance(Product, result))
    }

    @Post()
    async create(
        @Body(new ValidationPipe()) body: CreateProductDto,
        @Res() res: Response
    ) {
        const result = await this.productService.addProduct(body)
        return this.builder.buildResponse(res, result)
    }

    @Put(':uuid')
    async update(
        @Body(new ValidationPipe()) body: SaveProductDto,
        @Param('uuid') uuid: string,
        @Res() res: Response
    ) {
        const result = await this.productService.editProductByUuid(uuid, body)
        return this.builder.buildResponse(res, result)
    }

    @Delete(':uuid')
    async delete(
        @Param('uuid') uuid: string,
        @Res() res: Response
    ) {
        const result = await this.productService.deleteProductByUuid(uuid)
        return this.builder.buildResponse(res, result)
    }
}