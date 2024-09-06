import { Injectable, NotFoundException } from "@nestjs/common";
import { SearchCategoryDto } from "./dto/search-category.dto";
import { CreateSubCategoryDto } from "./dto/create-category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { SubCategory } from "./entities/sub-category.entity";
import { FindOptionsOrder, FindOptionsWhere, Like, Not, Repository } from "typeorm";
import { MainCategoryService } from "./main-category.service";
import { plainToInstance } from "class-transformer";
import paginateUtil from "src/utils/paginate.util";
import { StoreService } from "../stores/store.service";

@Injectable()
export class SubCategoryService {
    constructor(
        @InjectRepository(SubCategory) private readonly subcategoryRepository: Repository<SubCategory>,
        private readonly mainCategoryService: MainCategoryService,
        private readonly storeService: StoreService
    ) { }

    async existsByName(name: string) {
        return await this.subcategoryRepository.existsBy({ name })
    }

    async getSubCategories(query: SearchCategoryDto) {
        const filter: FindOptionsWhere<SubCategory> = {
            isDeleted: false,
            isInactive: false
        }

        const sort: FindOptionsOrder<SubCategory> = {
            createdAt: 'DESC'
        }

        const take = query.size ? query.size : 10
        const page = query.page ? query.page : 1
        const skip = (page - 1) * take

        if (query.name) filter.name = Like(`%${query.name}%`)
        if (query.includeInactive && query.includeInactive == 'true') filter.isInactive = undefined
        if (query.mainCategoryUuid) {
            const mainCategory = await this.mainCategoryService.getMainCategoryByUuid(query.mainCategoryUuid)
            if (!mainCategory) throw new NotFoundException('Main Category not found.')

            filter.mainCategory = { id: mainCategory.id }
        }

        const subcategories = await this.subcategoryRepository.findAndCount({
            where: filter,
            order: sort,
            take,
            skip,
            relations: ['mainCategory']
        })

        return paginateUtil.paginate(SubCategory, subcategories, page, take, skip)
    }

    async getSubCategoryById(uuid: string) {
        const subcategory = await this.subcategoryRepository.findOneBy({ uuid })
        if (!subcategory) return null

        return subcategory
    }

    async getSubCategoryOptionByStoreUuid(storeUuid: string) {
        const store = await this.storeService.getStoreByUuid(storeUuid)
        if (!store) throw new NotFoundException('Store not found.')

        const filter: FindOptionsWhere<SubCategory> = {
            isDeleted: false,
            isInactive: false,
            mainCategory: { uuid: store.mainCategory.uuid }
        }

        const order: FindOptionsOrder<SubCategory> = {
            'name': 'ASC'
        }

        const subcategories = await this.subcategoryRepository.find({
            where: filter,
            order
        })

        return subcategories
    }

    async createSubCategory(createSubCategoryDto: CreateSubCategoryDto) {
        const mainCategory = await this.mainCategoryService.getMainCategoryByUuid(createSubCategoryDto.mainCategoryId)
        if (!mainCategory) throw new NotFoundException('Main Category not found.')

        const subCategory = this.subcategoryRepository.create({ ...createSubCategoryDto, mainCategory: mainCategory })
        const inserted = await this.subcategoryRepository.save(subCategory)

        return plainToInstance(SubCategory, inserted)
    }

    async editSubCategory(uuid: string, editSubCategoryDto: CreateSubCategoryDto) {
        const subCategory = await this.subcategoryRepository.findOneBy({ uuid })
        if (!subCategory) throw new NotFoundException('Sub Category not found.')

        await this.subcategoryRepository.update(subCategory.id, editSubCategoryDto)
        return 'Subcategory edited successfully'
    }

    async deleteSubCategory(uuid: string) {
        const subCategory = await this.subcategoryRepository.findOneBy({ uuid })
        if (!subCategory) throw new NotFoundException('Sub Category not found.')

        subCategory.isDeleted = true
        subCategory.deletedAt = new Date()

        await this.subcategoryRepository.update(subCategory.id, subCategory)
        return 'Subcategory deleted successfully'
    }
}