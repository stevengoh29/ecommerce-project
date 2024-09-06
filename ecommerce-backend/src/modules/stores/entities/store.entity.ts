import { Expose } from "class-transformer";
import { BaseEntity } from "src/common/entity/base.entity";
import { MainCategory } from "src/modules/categories/entities/main-category.entity";
import { StoreCoupon } from "src/modules/coupons/entities/store-coupon.entity";
import { ProductDisplay } from "src/modules/products/entities/product-display.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('stores')
export class Store extends BaseEntity {
    @Column({ length: 255, nullable: true })
    bannerImageUrl: string;

    @Column({ length: 255, nullable: true })
    imageUrl: string;

    @Column({ length: 255, nullable: true })
    name: string;

    @Column({ length: 255, nullable: true })
    description: string;

    @Column({ length: 255, nullable: true })
    openingHours: string;

    @Column({ length: 255, nullable: true })
    closingHours: string;

    @Column({ type: 'boolean', default: false })
    isInactive: boolean

    @Column({ type: 'boolean', default: false })
    isAlwaysOpen: boolean

    @Column({ type: 'boolean', default: false })
    isSuspended: boolean

    // @OneToMany(() => StoreCoupon, (coupon) => coupon.id)
    // storeCoupons: StoreCoupon[]
    @OneToMany(() => ProductDisplay, (productDisplay) => productDisplay.id)
    productDisplay: ProductDisplay[]

    @OneToOne(() => User, (user) => user.id)
    @JoinColumn({ name: 'ownerId' })
    owner: User

    @ManyToOne(() => MainCategory, (mainCategory) => mainCategory.id)
    mainCategory: MainCategory
}