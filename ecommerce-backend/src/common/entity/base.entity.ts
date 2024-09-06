import { Expose } from "class-transformer";
import { Column, CreateDateColumn, DeleteDateColumn, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity {
    @Expose({ groups: ['ADMIN'] })
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ unique: true })
    @Generated('uuid')
    uuid: string;

    @Column({ type: 'boolean', default: false })
    isDeleted: boolean

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt: Date
}