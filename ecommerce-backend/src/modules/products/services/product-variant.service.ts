import { Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductVariant } from "../entities/product-variant.entity";
import { FindOptionsOrder, FindOptionsWhere, Repository } from "typeorm";
import { CreateProductVariantDto } from "../dto/create-product.dto";
import { plainToInstance } from "class-transformer";
import { ProductService } from "./product.service";
import { SaveProductDisplayDto } from "../dto/create-product-display.dto";

@Injectable()
export class ProductVariantService {
    constructor(
        @InjectRepository(ProductVariant)
        private readonly productVariantRepository: Repository<ProductVariant>,
        private readonly productService: ProductService
    ) { }

    async get(productUuid: string) {
        const filter: FindOptionsWhere<ProductVariant> = {
            isDeleted: false,
            isInactive: false,
            product: { uuid: productUuid }
        }

        const sort: FindOptionsOrder<ProductVariant> = {
            createdAt: 'ASC'
        }

        const productVariants = await this.productVariantRepository.find({
            where: filter,
            order: sort
        })

        return plainToInstance(ProductVariant, productVariants)
    }

    async getById(productUuid: string, productVariantUuid: string) {
        return await this.productVariantRepository.findOne({
            where: {
                uuid: productVariantUuid,
                product: { uuid: productUuid }
            },
            relations: ['product']
        })
    }

    async create(productUuid: string, saveVariantDto: CreateProductVariantDto) {
        const product = await this.productService.getProductByUuid(productUuid)
        if (!product) throw new NotFoundException('Product is not found')

        const productVariant = this.productVariantRepository.create({
            name: saveVariantDto.name,
            description: saveVariantDto.description,
            price: saveVariantDto.price,
            stock: saveVariantDto.stock,
            sku: saveVariantDto.sku,
            product
        })

        const newVariant = await this.productVariantRepository.save(productVariant)
        return plainToInstance(ProductVariant, newVariant)
    }

    async update(productUuid: string, productVariantUuid: string, editVariantDto: SaveProductDisplayDto) {
        const productVariant = await this.getById(productUuid, productVariantUuid)
        if (!productVariant) throw new NotFoundException('Product Variant is not found')

        await this.productVariantRepository.update(productVariant.id, editVariantDto)
        return 'Product variant updated successfully'
    }

    async delete(productUuid: string, productVariantUuid: string) {
        const productVariant = await this.getById(productUuid, productVariantUuid)
        if (!productVariant) throw new NotFoundException('Product Variant is not found')

        productVariant.isDeleted = true
        await this.productVariantRepository.update(productVariant.id, productVariant)
        return 'Product variant deleted successfully'
    }
}