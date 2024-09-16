import { BaseEntity } from "src/common/entity/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class ProductAdditionalItem extends BaseEntity {
    @Column({ length: 255 })
    name: string

    @Column({ type: 'double' })
    price: number

    @Column({ type: 'bigint' })
    stock: number

    @Column({ type: 'boolean', default: false })
    isInactive: boolean

    @ManyToOne(() => Product, (product) => product.productAdditionalItem)
    product: Product
}