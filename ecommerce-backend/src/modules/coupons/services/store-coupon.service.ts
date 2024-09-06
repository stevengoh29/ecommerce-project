import { NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import paginateUtil from "src/utils/paginate.util";
import { FindOptionsOrder, FindOptionsWhere, Like, Repository } from "typeorm";
import { CreateAppCouponPayload, SaveAppCouponPayload } from "../dto/app-coupon-create.dto";
import { AppCoupon } from "../entities/app-coupon.entity";
import { StoreCoupon } from "../entities/store-coupon.entity";
import { StoreCouponQueryParams } from "../dto/store-coupon-query.dto.";
import { CreateStoreCouponPayload, SaveStoreCouponPayload } from "../dto/store-coupon-create.dto";

export class StoreCouponService {
    constructor(
        @InjectRepository(StoreCoupon) private readonly storeCouponRepository: Repository<StoreCoupon>
    ) { }

    async getAll(query?: StoreCouponQueryParams) {
        const filter: FindOptionsWhere<StoreCoupon> = {
            isDeleted: false,
            isInactive: false
        }

        const sort: FindOptionsOrder<AppCoupon> = {
            createdAt: "ASC"
        }

        const take = query.size ? query.size : 10
        const page = query.page ? query.page : 1
        const skip = (page - 1) * take

        if (query.name) filter.name = Like(`%${query.name}%`)

        const result = await this.storeCouponRepository.findAndCount({
            where: filter,
            order: sort,
            take,
            skip
        })

        return paginateUtil.paginate(AppCoupon, result, page, take, skip)
    }

    async getById(uuid: string) {
        return this.storeCouponRepository.findOneBy({ uuid })
    }

    async existsByName(name: string) {
        const filter: FindOptionsWhere<AppCoupon> = {
            isDeleted: false,
            name
        }

        return await this.storeCouponRepository.existsBy(filter)
    }

    async create(createAppCouponPayload: CreateStoreCouponPayload) {
        // Check if name already exist
        const storeCouponExisted = await this.existsByName(createAppCouponPayload.name)
        if (storeCouponExisted) throw new UnprocessableEntityException('App Coupon has already existed.')

        const storeCoupon = this.storeCouponRepository.create(createAppCouponPayload)
        const inserted = await this.storeCouponRepository.save(storeCoupon)

        return inserted
    }

    async update(uuid: string, saveAppCouponPayload: SaveStoreCouponPayload) {
        const storeCoupon = await this.getById(uuid)
        if (!storeCoupon) throw new NotFoundException('App coupon is not found')

        await this.storeCouponRepository.update(storeCoupon.id, saveAppCouponPayload)
        return 'Update app coupon success'
    }

    async delete(uuid: string) {
        const storeCoupon = await this.getById(uuid)
        if (!storeCoupon) throw new NotFoundException('App coupon is not found')

        storeCoupon.isDeleted = true
        await this.storeCouponRepository.update(storeCoupon.id, storeCoupon)
        return 'Delete app coupon success'
    }
}
