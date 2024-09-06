import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { MainCategoryService } from "./main-category.service";
import { SearchCategoryDto } from "./dto/search-category.dto";
import { ResponseUtil } from "src/utils/response.util";
import { CreateMainCategoryDto } from "./dto/create-category.dto";
import { ValidationPipe } from "src/pipes/validation.pipe";

@Controller('category/main-category')
export class MainCategoryController {
    private readonly builder = new ResponseUtil()

    constructor(
        private readonly mainCategoryService: MainCategoryService
    ) { }

    @Get()
    async getMainCategories(
        @Query() query: SearchCategoryDto,
        @Res() res: Response
    ) {
        const [mainCategories, metadata] = await this.mainCategoryService.getMainCategories(query)
        return this.builder.buildResponse(res, mainCategories, metadata)
    }

    @Get(':id')
    async getMainCategoryById(
        @Param('id') id: string,
        @Res() res: Response
    ) {
        const mainCategory = await this.mainCategoryService.getMainCategoryByUuid(id)
        return this.builder.buildResponse(res, mainCategory)
    }

    @Post()
    async createMainCategory(
        @Body(new ValidationPipe()) body: CreateMainCategoryDto,
        @Res() res: Response
    ) {
        const mainCategory = await this.mainCategoryService.createMainCategory(body)
        return this.builder.buildResponse(res, mainCategory)
    }

    @Put(':id')
    async editMainCategory(
        @Param('id') id: string,
        @Body(new ValidationPipe()) body: CreateMainCategoryDto,
        @Res() res: Response
    ) {
        const mainCategory = await this.mainCategoryService.editMainCategoryById(id, body)
        return this.builder.buildResponse(res, mainCategory)
    }

    @Delete(':id')
    async deleteMainCategory(
        @Param('id') id: string,
        @Res() res: Response
    ) {
        const mainCategory = await this.mainCategoryService.deleteMainCategoryById(id)
        return this.builder.buildResponse(res, mainCategory)
    }
}