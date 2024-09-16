import { Column, Entity, ManyToOne } from "typeorm";
import { Product } from "./product.entity";
import { BaseEntity } from "src/common/entity/base.entity";

@Entity()
export class ProductVariant extends BaseEntity {
    @Column({ length: 255 })
    name: string

    @Column({ type: 'text' })
    description: string

    @Column({ length: 255 })
    sku: string

    @Column({ type: 'double', default: 0 })
    price: number

    @Column({ type: 'integer', default: 0 })
    stock: number

    @Column({ type: 'boolean', default: false })
    isInactive: boolean

    @ManyToOne(() => Product, (product) => product.productVariant)
    product: Product
}   