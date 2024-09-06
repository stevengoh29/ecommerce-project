import { Controller, Delete, Get, Param, Post, Put, Query, Res, Body } from "@nestjs/common";
import { StoreService } from "./store.service";
import { SearchStoreDto } from "./dto/search-store.dto";
import { Response } from 'express';
import { ValidationPipe } from "src/pipes/validation.pipe";
import { ResponseUtil } from "src/utils/response.util";
import { CreateStoreDto, SaveStoreDto } from "./dto/create-store.dto";


@Controller('store')
export class StoreController {
    private readonly builder = new ResponseUtil()

    constructor(
        private readonly storeService: StoreService
    ) { }

    @Get()
    async getAll(
        @Query() query: SearchStoreDto,
        @Res() res: Response
    ) {
        const result = await this.storeService.getStores(query)
        return this.builder.buildResponse(res, result)
    }

    @Get(':uuid')
    async getByUuid(
        @Param('uuid') uuid: string,
        @Res() res: Response
    ) {
        const result = await this.storeService.getStoreByUuid(uuid)
        return this.builder.buildResponse(res, result)
    }

    @Get(':uuid/get-detailed')
    async getDetailedByUuid(
        @Param('uuid') uuid: string,
        @Res() res: Response
    ) {
        const result = await this.storeService.getStoreByUuid(uuid)
        return this.builder.buildResponse(res, result)
    }

    @Post()
    async addStore(
        @Body(new ValidationPipe()) body: CreateStoreDto,
        @Res() res: Response
    ) {
        const result = await this.storeService.addStore(body)
        return this.builder.buildResponse(res, result)
    }

    @Put(':uuid')
    async editStore(
        @Param('uuid') uuid: string,
        @Body(new ValidationPipe()) body: SaveStoreDto,
        @Res() res: Response
    ) {
        const result = await this.storeService.editStore(uuid, body)
        return this.builder.buildResponse(res, result)
    }

    @Delete(':uuid')
    async deleteStore(
        @Param('uuid') uuid: string,
        @Res() res: Response
    ) {
        const result = await this.storeService.deleteStore(uuid)
        return this.builder.buildResponse(res, result)
    }
}