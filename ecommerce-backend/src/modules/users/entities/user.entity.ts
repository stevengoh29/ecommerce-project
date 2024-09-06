import { Exclude, Expose } from "class-transformer";
import { AfterUpdate, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn, VirtualColumn } from "typeorm";
import { UserType } from "../enum/user-type.enum";
import { UserStatus } from "../enum/user-status.enum";
import { Gender } from "../enum/gender.enum";
import { genSalt, hash } from 'bcrypt'

@Entity({ name: 'users' })
export class User {
    @Expose({ groups: ['ADMIN'] })
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ unique: true })
    @Generated('uuid')
    uuid: string;

    @Column({ length: 255, nullable: true })
    imagePath: string;

    @Column({ length: 255, nullable: true })
    imageUrl: string;

    @Column({ length: 255 })
    firstName: string;

    @Column({ length: 255 })
    lastName: string;

    @VirtualColumn({
        query: (alias) =>
            `SELECT first_name || ' ' || last_name as full_name FROM "users" WHERE "id" = ${alias}.id`,
    })
    fullName: string;

    @Column({ length: 255, unique: true })
    username: string;

    @Column({ type: 'enum', enum: Gender, default: Gender.MALE })
    gender: Gender

    @Column({ length: 255, unique: true })
    email: string;

    @Column({ type: 'timestamp', nullable: true })
    emailVerifiedAt: Date;

    @Column({ length: 255 })
    phoneCode: string;

    @Column({ length: 255 })
    phoneNumber: string;

    @VirtualColumn({
        query: (alias) =>
            `SELECT phone_code || '' || phone_number as formatted_phone_number FROM "users" WHERE "id" = ${alias}.id`,
    })
    formattedPhoneNumber: string;

    @Exclude()
    @Column({ length: 255 })
    password: string;

    @Column({ type: 'enum', enum: UserType, default: UserType.USER })
    role: string;

    @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
    status: string;

    @Exclude()
    @Column({ length: 255, nullable: true })
    refreshToken: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    setPassword = async (password: string) => {
        const salt = await genSalt()
        this.password = await hash(password || this.password, salt)
    }
}