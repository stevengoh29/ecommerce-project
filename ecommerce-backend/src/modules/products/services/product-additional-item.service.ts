import { Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductAdditionalItem } from "../entities/product-additional-item.entity";
import { FindOptionsOrder, FindOptionsWhere, Repository } from "typeorm";
import { CreateAdditionalItemDto, SaveAdditionalItemDto } from "../dto/create-product.dto";
import { ProductService } from "./product.service";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ProductAdditionalItemService {
    constructor(
        @InjectRepository(ProductAdditionalItem)
        private readonly productAdditionalItemRepository: Repository<ProductAdditionalItem>,
        private readonly productService: ProductService
    ) { }

    async get(productUuid: string) {
        const filter: FindOptionsWhere<ProductAdditionalItem> = {
            isDeleted: false,
            isInactive: false,
            product: { uuid: productUuid }
        }

        const sort: FindOptionsOrder<ProductAdditionalItem> = {
            createdAt: 'ASC'
        }

        const productAdditionalItems = await this.productAdditionalItemRepository.find({
            where: filter,
            order: sort
        })

        return plainToInstance(ProductAdditionalItem, productAdditionalItems)
    }

    async getById(productUuid: string, productAdditionalItemUuid: string) {
        return await this.productAdditionalItemRepository.findOne({
            where: {
                uuid: productAdditionalItemUuid,
                product: { uuid: productUuid }
            },
            relations: ['product']
        })
    }

    async create(productUuid: string, saveAdditionalDto: CreateAdditionalItemDto) {
        const product = await this.productService.getProductByUuid(productUuid)
        if (!product) throw new NotFoundException('Product is not found')

        const additionalItem = this.productAdditionalItemRepository.create({
            name: saveAdditionalDto.name,
            price: saveAdditionalDto.price,
            stock: saveAdditionalDto.stock,
            product
        })

        const newAdditionalItem = await this.productAdditionalItemRepository.save(additionalItem)
        return plainToInstance(ProductAdditionalItem, newAdditionalItem)
    }

    async update(productUuid: string, additionalUuid: string, editAdditionalDto: SaveAdditionalItemDto) {
        const productAdditionalItem = await this.getById(productUuid, additionalUuid)
        if (!productAdditionalItem) throw new NotFoundException('Product Additional Item is not found')

        await this.productAdditionalItemRepository.update(productAdditionalItem.id, editAdditionalDto)
        return 'Product Additional Item updated successfully'
    }

    async delete(productUuid: string, additionalUuid: string) {
        const productAdditionalItem = await this.getById(productUuid, additionalUuid)
        if (!productAdditionalItem) throw new NotFoundException('Product Additional Item is not found')

        productAdditionalItem.isDeleted = true
        await this.productAdditionalItemRepository.update(productAdditionalItem.id, productAdditionalItem)
        return 'Product Additional Item deleted successfully'
    }
}