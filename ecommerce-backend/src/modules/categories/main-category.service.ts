import { Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsOrder, FindOptionsWhere, Like, Repository } from "typeorm";
import { MainCategory } from "./entities/main-category.entity";
import { SearchCategoryDto } from "./dto/search-category.dto";
import { CreateMainCategoryDto } from "./dto/create-category.dto";
import { plainToClass, plainToInstance } from "class-transformer";
import paginateUtil from "src/utils/paginate.util";

@Injectable()
export class MainCategoryService {
    constructor(
        @InjectRepository(MainCategory) private readonly mainCategoryRepository: Repository<MainCategory>
    ) { }

    async getMainCategories(query: SearchCategoryDto) {
        const filter: FindOptionsWhere<MainCategory> = {
            isDeleted: false,
            isInactive: false
        }   

        const sort: FindOptionsOrder<MainCategory> = {
            createdAt: "ASC"
        }

        const take = query.size ? query.size : 10
        const page = query.page ? query.page : 1
        const skip = (page - 1) * take

        if (query.name) filter.name = Like(`%${query.name}%`)
        if (query.includeInactive && query.includeInactive == 'true') filter.isInactive = undefined

        if (query.mainCategoryQueryType) {
            // TODO
        }

        const result = await this.mainCategoryRepository.findAndCount({
            where: filter,
            order: sort,
            take,
            skip
        })

        return paginateUtil.paginate(MainCategory, result, page, take, skip)
    }

    async getMainCategoryByUuid(uuid: string) {
        return this.mainCategoryRepository.findOneBy({ uuid })
    }

    async existsByName(name: string) {
        const filter: FindOptionsWhere<MainCategory> = {
            isDeleted: false,
            name
        }

        return await this.mainCategoryRepository.existsBy(filter)
    }

    async createMainCategory(createMainCategoryDto: CreateMainCategoryDto) {
        // Check if name already exist
        const mainCategoryExisted = await this.existsByName(createMainCategoryDto.name)
        if (mainCategoryExisted) throw new UnprocessableEntityException('Main Category has already existed.')

        const mainCategory = this.mainCategoryRepository.create(createMainCategoryDto) 
        const inserted = await this.mainCategoryRepository.save(mainCategory)

        return inserted
    }

    async editMainCategoryById(uuid: string, editMainCategoryDto: CreateMainCategoryDto) {
        const mainCategory = await this.mainCategoryRepository.findOneBy({ uuid })
        if (!mainCategory) throw new NotFoundException('Main Category is not found.')

        await this.mainCategoryRepository.update(mainCategory.id, editMainCategoryDto)
        return 'Edit main category by id success'
    }

    async deleteMainCategoryById(uuid: string) {
        const mainCategory = await this.mainCategoryRepository.findOneBy({ uuid })
        if (!mainCategory) throw new NotFoundException('Main Category is not found.')

        mainCategory.isDeleted = true
        await this.mainCategoryRepository.update(mainCategory.id, mainCategory)
        return 'Delete main category by id success'
    }
}