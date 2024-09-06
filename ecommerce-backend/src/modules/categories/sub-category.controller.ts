import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from "@nestjs/common";
import { SearchCategoryDto } from "./dto/search-category.dto";
import { SubCategoryService } from "./sub-category.service";
import { ResponseUtil } from "src/utils/response.util";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { CreateSubCategoryDto } from "./dto/create-category.dto";
import { Response } from "express";

@Controller('category/sub-category')
export class SubCategoryController {
    private readonly builder = new ResponseUtil()

    constructor(
        private readonly subCategoryService: SubCategoryService
    ) { }

    @Get()
    async getSubCategories(
        @Query() query: SearchCategoryDto,
        @Res() res: Response
    ) {
        const [subcategories, meta] = await this.subCategoryService.getSubCategories(query)
        return this.builder.buildResponse(res, subcategories, meta)
    }

    @Get(':id')
    async getSubCategoryById(
        @Param('id') id: string,
        @Res() res: Response
    ) {
        const subcategory = await this.subCategoryService.getSubCategoryById(id)
        return this.builder.buildResponse(res, subcategory)
    }

    @Get('get-by-store/:id')
    async getOptionsByStoreUuid(
        @Param('id') id: string,
        @Res() res: Response
    ) {
        const subcategories = await this.subCategoryService.getSubCategoryOptionByStoreUuid(id)
        return this.builder.buildResponse(res, subcategories)
    }

    @Post()
    async createSubCategory(
        @Body(new ValidationPipe()) body: CreateSubCategoryDto,
        @Res() res: Response
    ) {
        const subcategory = await this.subCategoryService.createSubCategory(body)
        return this.builder.buildResponse(res, subcategory)   
    }

    @Put(':id')
    async editSubCategory(
        @Param('id') id: string,
        @Body(new ValidationPipe()) body: CreateSubCategoryDto,
        @Res() res: Response
    ) {
        const subcategory = await this.subCategoryService.editSubCategory(id, body)
        return this.builder.buildResponse(res, subcategory)
    }

    @Delete(':id')
    async deleteSubCategory(
        @Param('id') id: string,
        @Res() res: Response
    ) {
        const subcategory = await this.subCategoryService.deleteSubCategory(id)
        return this.builder.buildResponse(res, subcategory)       
    }
}