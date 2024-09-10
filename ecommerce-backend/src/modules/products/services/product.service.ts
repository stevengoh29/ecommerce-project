import { Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SubCategoryService } from "src/modules/categories/sub-category.service";
import { DataSource, FindOptionsOrder, FindOptionsWhere, In, Like, Not, Repository } from "typeorm";
import { CreateProductDto, SaveProductDto } from "../dto/create-product.dto";
import { SearchProductDto } from "../dto/search-product.dto";
import { ProductAdditionalItem } from "../entities/product-additional-item.entity";
import { ProductVariant } from "../entities/product-variant.entity";
import { Product } from "../entities/product.entity";
import { StoreService } from "src/modules/stores/store.service";
import paginateUtil from "src/utils/paginate.util";

@Injectable()
export class ProductService {
    constructor(
        private readonly subcategoryService: SubCategoryService,
        private readonly storeService: StoreService,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly dataSource: DataSource
    ) { }

    getProduct = async (query: SearchProductDto) => {
        const filter: FindOptionsWhere<Product> = {
            isDeleted: false,
            isInactive: false
        }

        const sort: FindOptionsOrder<Product> = {
            createdAt: "DESC"
        }

        if (query.name) filter.name = Like(`%${query.name}%`)

        if (query.subcategoryUuid) {
            const subcategory = await this.subcategoryService.getSubCategoryById(query.subcategoryUuid)
            if (!subcategory) throw new NotFoundException('Subcategory is not found.')

            filter.subCategory = { uuid: subcategory.uuid }
        }

        if (query.storeUuid) {
            const store = await this.storeService.getStoreByUuid(query.storeUuid)
            if (!store) throw new NotFoundException('Store not found.')

            filter.store = { uuid: store.uuid }
        }

        const take = query.size ? query.size : 20
        const page = query.page ? query.page : 1
        const skip = (page - 1) * take

        const products = await this.productRepository.findAndCount({
            where: filter,
            order: sort,
            take,
            skip,
            relations: ['subCategory']
        })

        return paginateUtil.paginate(Product, products, page, take, skip)
    }

    getProductByUuid = async (uuid: string) => {
        return this.productRepository.findOneBy({ uuid })
    }

    getProductByUuids = async (uuids: string[]) => {
        return this.productRepository.findBy({ uuid: In(uuids) })
    }

    addProduct = async (productInput: CreateProductDto) => {
        const productNameExisted = await this.productRepository.existsBy({ name: productInput.name, isDeleted: false })
        if (productNameExisted) throw new UnprocessableEntityException(`Product name of ${productInput.name} has already existed.`)

        const subcategory = await this.subcategoryService.getSubCategoryById(productInput.subcategoryUuid)
        if (!subcategory) throw new NotFoundException('Subcategory not found')

        const store = await this.storeService.getStoreByUuid(productInput.store)
        if (!store) throw new NotFoundException('Store not found')

        // TODO : PRODUCT DISPLAYS FOR PRODUCT ADD.

        await this.dataSource.transaction(async entityManager => {
            // Create Product 
            const newProduct = entityManager.create(Product, {
                name: productInput.name,
                description: productInput.description,
                imageUrl: productInput.imageUrl,
                subCategory: subcategory,
                store
            })

            const product = await entityManager.save(newProduct)

            // Create Product Variant
            for (const productVariant of productInput.productVariants) {
                const newProductVariant = entityManager.create(ProductVariant, {
                    name: productVariant.name,
                    description: productVariant.description,
                    price: productVariant.price,
                    stock: productVariant.stock,
                    sku: productVariant.sku,
                    product
                })

                await entityManager.save(newProductVariant)
            }

            // Create Product Additional Item
            for (const productAdditionalItem of productInput.additionalItems) {
                const newAdditionalItem = entityManager.create(ProductAdditionalItem, {
                    name: productAdditionalItem.name,
                    price: productAdditionalItem.price,
                    stock: productAdditionalItem.stock,
                    product
                })

                await entityManager.save(newAdditionalItem)
            }
        })

        return 'Product has been added successfully'
    }

    editProductByUuid = async (uuid: string, editDto: SaveProductDto) => {
        const product = await this.productRepository.findOneBy({ uuid })
        if (!product) throw new NotFoundException('Product not found')

        const updatedProduct = await this.productRepository.update(product.id, editDto)
        return 'Product updated successfully'
    }

    deleteProductByUuid = async (uuid: string) => {
        const product = await this.productRepository.findOneBy({ uuid })
        if (!product) throw new NotFoundException('Product not found')

        product.isDeleted = true
        await this.productRepository.update(product.id, product)
        return 'Product deleted successfully'
    }
}