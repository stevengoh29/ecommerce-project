import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StoreService } from "src/modules/stores/store.service";
import { FindOptionsOrder, FindOptionsWhere, In, Like, Repository } from "typeorm";
import { AssignProductToDisplayDto, CreateProductDisplayDto, SaveProductDisplayDto } from "../dto/create-product-display.dto";
import { ProductDisplay } from "../entities/product-display.entity";
import { ProductService } from "./product.service";
import { SearchProductDisplayDto } from "../dto/search-product-display.dto";
import paginateUtil from "src/utils/paginate.util";

@Injectable()
export class ProductDisplayService {
    constructor(
        @InjectRepository(ProductDisplay)
        private readonly productDisplayRepository: Repository<ProductDisplay>,
        private readonly storeService: StoreService,
        @Inject(forwardRef(() => ProductService))
        private readonly productService: ProductService,
    ) { }

    async get(query: SearchProductDisplayDto) {
        const filter: FindOptionsWhere<ProductDisplay> = {
            isDeleted: false,
            isInactive: false
        }

        const sort: FindOptionsOrder<ProductDisplay> = {
            createdAt: "DESC"
        }

        const take = query.size ? query.size : 20
        const page = query.page ? query.page : 1
        const skip = (page - 1) * take

        if (query.name) filter.name = Like(`%${query.name}%`)
        if (query.store) {
            const store = await this.storeService.getStoreByUuid(query.store)
            filter.store = { id: store.id }
        }

        if (query.includeInactive && query.includeInactive == 'true') filter.isInactive = undefined

        const result = await this.productDisplayRepository.findAndCount({
            where: filter,
            order: sort,
            take,
            skip
        })

        return paginateUtil.paginate(ProductDisplay, result, page, take, skip)
    }

    async getById(uuid: string) {
        const productDisplay = await this.productDisplayRepository.findOne({ where: { uuid }, relations: ['products'] })
        return productDisplay
    }

    async getByUuids(uuids: string[]) {
        const filter: FindOptionsWhere<ProductDisplay> = {
            uuid: In(uuids),
            isDeleted: false
        }

        const [productDisplay, count] = await this.productDisplayRepository.findAndCount({
            where: filter
        })

        if (count != uuids.length) throw new NotFoundException('Some product display are not found')
        return productDisplay
    }

    async create(body: CreateProductDisplayDto) {
        const store = await this.storeService.getStoreByUuid(body.store)
        if (!store) throw new NotFoundException('Store is not found')

        const products = await this.productService.getProductByUuids(body.products)

        const productDisplay = this.productDisplayRepository.create({
            name: body.name,
            description: body.description,
            store,
            products
        })

        const newProductDisplay = await this.productDisplayRepository.save(productDisplay)
        return newProductDisplay
    }

    async assignProductToDisplay(assignProductDto: AssignProductToDisplayDto, productDisplayUuid: string) {
        const filter: FindOptionsWhere<ProductDisplay> = {
            isDeleted: false,
            isInactive: false
        }

        const [products, productDisplay] = await Promise.all([
            this.productService.getProductByUuids(assignProductDto.productUuids),
            this.productDisplayRepository.findOne({
                where: { ...filter, uuid: productDisplayUuid }
            })
        ])

        if (!productDisplay) throw new NotFoundException('Product display is not found')

        productDisplay.products = products
        const result = await this.productDisplayRepository.save(productDisplay)

        return 'Product Display saved successfully'
    }

    async update(uuid: string, editDto: SaveProductDisplayDto) {
        const productDisplay = await this.productDisplayRepository.findOne({
            where: { uuid },
            relations: ['products']
        })

        if (!productDisplay) throw new NotFoundException('Product display is not found.')

        const products = await this.productService.getProductByUuids(editDto.products)

        const updatedProductDisplay = {
            ...productDisplay,
            ...editDto,
            products,
        };

        await this.productDisplayRepository.save(updatedProductDisplay)
        return 'Update product display is success'
    }

    async delete(uuid: string) {
        const productDisplay = await this.productDisplayRepository.findOneBy({ uuid })
        if (!productDisplay) throw new NotFoundException('Product display is not found.')

        productDisplay.isDeleted = true
        await this.productDisplayRepository.update(productDisplay.id, productDisplay)

        return 'Delete Product Display by uuid success.'
    }
}