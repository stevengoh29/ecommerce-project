import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { randomInt } from "crypto";
import { AuthenticationException } from "src/exceptions/security";
import hashUtil from "src/utils/hash.util";
import { FindOptionsWhere, MoreThanOrEqual, Repository } from "typeorm";
import { UsersService } from "../users/user.service";
import { ResSendOtpDto } from "./dto/res-send-otp.dto";
import { Otp } from "./entities/otp.entity";

@Injectable()
export class OtpService {
    constructor(
        @InjectRepository(Otp)
        private readonly otpRepository: Repository<Otp>,
        private readonly usersService: UsersService
    ) { }

    async sendOtpByUserEmail(email: string): Promise<ResSendOtpDto> {
        const user = await this.usersService.getUserByEmail(email)
        const otp = randomInt(1000, 9999).toString()
        const token = await hashUtil.genBase64String()

        const newOtpEntity = this.otpRepository.create({
            token,
            otp,
            user,
            email
        })

        const newOtp = await this.otpRepository.save(newOtpEntity)
        return { otpToken: newOtp.token }
    }

    async verifyOtp(token: string, otpInput: string) {
        const whereClause: FindOptionsWhere<Otp> = {
            token,
            otp: otpInput,
            isVerified: false,
            expiredAt: MoreThanOrEqual(new Date())
        }

        const otp = await this.otpRepository.findOne({ where: whereClause })
        if (!otp) throw new BadRequestException('Invalid OTP. Please try again')

        otp.isVerified = true
        otp.verifiedAt = new Date()

        await this.otpRepository.update(otp.id, otp)
    }

    async getOtpByToken(token: string) {
        const whereClause: FindOptionsWhere<Otp> = {
            isVerified: true,
            isValid: true,
            token
        }

        const otp = await this.otpRepository.findOneBy(whereClause)
        return otp
    }

    async invalidateToken(otp: Otp) {
        otp.isValid = false
        return await this.otpRepository.update(otp.id, otp)
    }
}