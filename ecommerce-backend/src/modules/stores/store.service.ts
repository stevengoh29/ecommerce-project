import { Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsOrder, FindOptionsWhere, Repository } from "typeorm";
import { MainCategoryService } from "../categories/main-category.service";
import { UsersService } from "../users/user.service";
import { CreateStoreDto, SaveStoreDto } from "./dto/create-store.dto";
import { SearchStoreDto } from "./dto/search-store.dto";
import { Store } from "./entities/store.entity";

@Injectable()
export class StoreService {
    constructor(
        @InjectRepository(Store)
        private readonly storeRepository: Repository<Store>,
        private readonly userService: UsersService,
        private readonly mainCategoryService: MainCategoryService
    ) { }

    async getStores(query: SearchStoreDto) {
        const filter: FindOptionsWhere<Store> = {
            isDeleted: false,
            isInactive: false
        }

        const sort: FindOptionsOrder<Store> = {
            createdAt: 'DESC'
        }

        // TODO: Work on Filters
        // --- Filter here ---

        const stores = await this.storeRepository.find({
            where: filter,
            order: sort,
            relations: ['mainCategory']
        })

        return stores;
    }

    async getStoreByUuid(uuid: string) {
        const store = await this.storeRepository.findOne({ where: { uuid }, relations: ['mainCategory'] })
        return store
    }

    async getStoreByUserUuid(uuid: string) {
        const store = await this.storeRepository.findOneBy({ owner: { uuid: uuid } })
        return store
    }

    async existsByStoreName(name: string) {
        return this.storeRepository.existsBy({ name, isDeleted: false })
    }

    async addStore(storeInput: CreateStoreDto) {
        const storeExisted = await this.existsByStoreName(storeInput.name)
        if (storeExisted) throw new UnprocessableEntityException('Store name has already existed')

        const user = await this.userService.getUserByUuid(storeInput.owner)
        if (!user) throw new NotFoundException('User is not found')

        const mainCategory = await this.mainCategoryService.getMainCategoryByUuid(storeInput.mainCategoryUuid)
        if (!mainCategory) throw new NotFoundException('Main Category is not found')

        const store = this.storeRepository.create({
            name: storeInput.name,
            description: storeInput.description,
            openingHours: storeInput.openingHours,
            closingHours: storeInput.closingHours,
            isAlwaysOpen: storeInput.isAlwaysOpen,
            owner: user,
            imageUrl: storeInput.imageUrl,
            bannerImageUrl: storeInput.bannerImageUrl,
            mainCategory: mainCategory
        })

        const newStore = await this.storeRepository.save(store)
        return newStore
    }

    async editStore(storeUuid: string, storeInput: SaveStoreDto) {
        const existingStore = await this.storeRepository.findOneBy({ uuid: storeUuid })
        if (!existingStore) throw new NotFoundException('Store is not found')

        const updatedStore = await this.storeRepository.update(existingStore.id, storeInput)
        return 'Store updated succcessfully'
    }

    async deleteStore(storeUuid: string) {
        const existingStore = await this.storeRepository.findOneBy({ uuid: storeUuid })
        if (!existingStore) throw new NotFoundException('Store is not found')

        existingStore.isDeleted = true
        existingStore.deletedAt = new Date()

        await this.storeRepository.update(existingStore.id, existingStore)
        return 'Store deleted succcessfully'
    }
}