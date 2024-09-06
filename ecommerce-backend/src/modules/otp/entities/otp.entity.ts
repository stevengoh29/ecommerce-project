import { Expose } from "class-transformer";
import { User } from "src/modules/users/entities/user.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'otps' })
export class Otp {
    @Expose({ groups: ['ADMIN'] })
    @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
    id: number;

    @Column({ unique: true })
    @Generated('uuid')
    uuid: string;

    @Column()
    token: string

    @Column()
    email: string

    @Column({ type: 'boolean', default: false })
    isVerified: boolean

    @Column({ type: 'boolean', default: true })
    isValid: boolean

    @Column()
    otp: string

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @Column({ type: 'timestamp', default: null })
    verifiedAt: Date

    @Column({ type: 'timestamp' })
    expiredAt: Date

    @ManyToOne(() => User, { eager: true })
    @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
    user: User

    @BeforeInsert()
    async setExpiredAt() {
        const currentDate = new Date()

        // Add 1 hours for expiration
        this.expiredAt = new Date(currentDate.setHours(currentDate.getHours() + 1))
    }
}