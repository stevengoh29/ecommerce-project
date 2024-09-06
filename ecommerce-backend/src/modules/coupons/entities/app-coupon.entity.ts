import { BaseEntity } from "src/common/entity/base.entity";
import { MainCategory } from "src/modules/categories/entities/main-category.entity";
import { SubCategory } from "src/modules/categories/entities/sub-category.entity";
import { Store } from "src/modules/stores/entities/store.entity";
import { Column, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { DiscountType } from "../enums/discount-type.enum";

export class AppCoupon extends BaseEntity {
    @Column({ length: 255, nullable: true })
    name: string

    @Column({ length: 255, nullable: true })
    description: string

    @Column({ type: 'timestamp' })
    validFrom: Date

    @Column({ type: 'timestamp' })
    validTo: Date

    @Column({ type: 'boolean', default: false })
    isFullyClaimed: boolean

    @Column({ type: 'int', nullable: true })
    quotaLimit: number

    @Column({ type: 'boolean', default: true })
    isValidToAll: boolean

    @Column({ type: 'boolean', default: false })
    isInactive: boolean

    @Column({ type: 'decimal', default: 0 })
    minimumPurchase: number

    @Column({ type: 'decimal', default: 0 })
    maximumDiscountAmount: number

    @Column({ type: 'enum', enum: DiscountType, default: DiscountType.FIXED })
    discountType: DiscountType

    @ManyToMany(() => MainCategory)
    @JoinTable()
    mainCategories: MainCategory[]

    @ManyToOne(() => Store, (store) => store.id)
    store: Store
}