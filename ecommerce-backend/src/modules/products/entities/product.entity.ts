import { BaseEntity } from "src/common/entity/base.entity";
import { SubCategory } from "src/modules/categories/entities/sub-category.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { ProductVariant } from "./product-variant.entity";
import { ProductAdditionalItem } from "./product-additional-item.entity";
import { Store } from "src/modules/stores/entities/store.entity";
import { ProductDisplay } from "./product-display.entity";

@Entity()
export class Product extends BaseEntity {
    @Column({ type: 'varchar', length: 255 })
    name: string

    @Column({ type: 'varchar', length: 255 })
    description: string

    @Column({ type: 'varchar' })
    imageUrl: string

    @Column({ type: 'boolean', default: false })
    isInactive: boolean

    @Column({ type: 'double', default: 0 })
    ratings: number

    @Column({ type: 'bigint', default: 0 })
    totalReview: number

    @ManyToOne(() => SubCategory, (subCategory) => subCategory.id)
    subCategory: SubCategory

    @OneToMany(() => ProductVariant, (productVariant) => productVariant.product)
    productVariant: ProductVariant[]

    @OneToMany(() => ProductAdditionalItem, (additionalItem) => additionalItem.product)
    productAdditionalItem: ProductAdditionalItem[]

    @ManyToOne(() => Store, (store) => store.id)
    store: Store

    @ManyToMany(() => ProductDisplay, productDisplay => productDisplay.products)
    @JoinTable({name: 'product_display_products'})
    productDisplays: ProductDisplay[];
}