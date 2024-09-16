import { BaseEntity } from "src/common/entity/base.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { Store } from "src/modules/stores/entities/store.entity";
import { Expose } from "class-transformer";

@Entity()
export class ProductDisplay extends BaseEntity {
    @Column({ type: 'varchar', length: 255 })
    name: string

    @Column({ type: 'varchar', length: 255 })
    description: string

    @Column({ type: 'boolean', default: false })
    isInactive: boolean

    @ManyToMany(() => Product, (product) => product.id)
    @JoinColumn()
    @JoinTable({ name: 'product_display_products' })
    products: Product[]

    @ManyToOne(() => Store, (store) => store.id)
    @JoinColumn([{ name: 'storeId', referencedColumnName: 'id' }])
    store: Store
}