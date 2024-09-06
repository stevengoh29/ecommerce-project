import { Exclude, Expose } from "class-transformer";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MainCategory } from "./main-category.entity";

@Entity({ name: 'sub_category' })
export class SubCategory {
    @Expose({ groups: ['ADMIN'] })
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number

    @Column({ unique: true })
    @Generated('uuid')
    uuid: string

    @Column({ length: 255, nullable: true })
    imagePath: string

    @Column({ length: 255, nullable: true })
    imageUrl: string

    @Column({ length: 255, nullable: false })
    name: string

    @Column({ length: 255, nullable: false })
    description: string

    @Column({ type: 'boolean', default: false })
    isInactive: boolean

    @Exclude()
    @Column({ type: 'boolean', default: false })
    isDeleted: boolean

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt: Date

    @ManyToOne(() => MainCategory, (mainCategory) => mainCategory.id, { eager: true })
    mainCategory: MainCategory
}