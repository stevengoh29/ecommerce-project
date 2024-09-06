import { ArrayOverlap, FindOptionsOrder, FindOptionsWhere, Like, Repository } from "typeorm";
import { AppCouponQueryParams } from "../dto/app-coupon-query.dto";
import { AppCoupon } from "../entities/app-coupon.entity";
import { InjectRepository } from "@nestjs/typeorm";
import paginateUtil from "src/utils/paginate.util";
import { CreateAppCouponPayload, SaveAppCouponPayload } from "../dto/app-coupon-create.dto";
import { NotFoundException, UnprocessableEntityException } from "@nestjs/common";

export class AppCouponService {
    constructor(
        @InjectRepository(AppCoupon) private readonly appCouponRepository: Repository<AppCoupon>
    ) { }

    async getAll(query?: AppCouponQueryParams) {
        const filter: FindOptionsWhere<AppCoupon> = {
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

        const result = await this.appCouponRepository.findAndCount({
            where: filter,
            order: sort,
            take,
            skip
        })

        return paginateUtil.paginate(AppCoupon, result, page, take, skip)
    }

    async getById(uuid: string) {
        return this.appCouponRepository.findOneBy({ uuid })
    }

    async existsByName(name: string) {
        const filter: FindOptionsWhere<AppCoupon> = {
            isDeleted: false,
            name
        }

        return await this.appCouponRepository.existsBy(filter)
    }

    async create(createAppCouponPayload: CreateAppCouponPayload) {
        // Check if name already exist
        const appCouponExisted = await this.existsByName(createAppCouponPayload.name)
        if (appCouponExisted) throw new UnprocessableEntityException('App Coupon has already existed.')

        const appCoupon = this.appCouponRepository.create(createAppCouponPayload)
        const inserted = await this.appCouponRepository.save(appCoupon)

        return inserted
    }

    async update(uuid: string, saveAppCouponPayload: SaveAppCouponPayload) {
        const appCoupon = await this.getById(uuid)
        if (!appCoupon) throw new NotFoundException('App coupon is not found')

        await this.appCouponRepository.update(appCoupon.id, saveAppCouponPayload)
        return 'Update app coupon success'
    }

    async delete(uuid: string) {
        const appCoupon = await this.getById(uuid)
        if (!appCoupon) throw new NotFoundException('App coupon is not found')

        appCoupon.isDeleted = true
        await this.appCouponRepository.update(appCoupon.id, appCoupon)
        return 'Delete app coupon success'
    }
}
