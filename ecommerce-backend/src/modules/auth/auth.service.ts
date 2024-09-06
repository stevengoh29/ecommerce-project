import { Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { Repository } from "typeorm";
import { UsersService } from "../users/user.service";
import { JwtService } from "@nestjs/jwt";
import { OtpService } from "../otp/otp.service";
import { StoreService } from "../stores/store.service";
import { CreateUserDto } from "../users/dto/create-user.dto";

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private readonly usersService: UsersService,
        private readonly otpService: OtpService,
        private readonly jwtService: JwtService,
        private readonly storeService: StoreService
    ) { }

    async doLogin(username: string, password: string) {
        try {
            const user = await this.usersService.getUserByUsernameAndPassword(username, password)

            // TODO: Add JWT Token for access and refresh token
            const payload: any = { userId: user.uuid, userRole: user.role }

            if (user.role == 'SELLER') {
                const store = await this.storeService.getStoreByUserUuid(user.uuid)
                if (store) payload.storeId = store.uuid
            }

            const accessToken = this.jwtService.sign(payload)
            const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' })

            return { accessToken, refreshToken }
        } catch (error) {
            this.logger.error(error)
            throw new InternalServerErrorException(error)
        }
    }

    async doRegister(userRegisterDto: CreateUserDto) {
        try {
            const user = await this.usersService.addUser(userRegisterDto)

            const payload: any = { userId: user.uuid, userRole: user.role }

            const accessToken = this.jwtService.sign(payload)
            const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' })

            return { accessToken, refreshToken }
        } catch (error) {
            this.logger.error(error)
            throw new InternalServerErrorException(error);
        }
    }

    async doRefreshToken(token: string) {
        const payload = this.jwtService.verify(token)
        const user = await this.usersService.getUserByUuid(payload.userId)

        const newPayload: any = { userId: user.uuid, userRole: user.role }

        if (user.role == 'SELLER') {
            const store = await this.storeService.getStoreByUserUuid(user.uuid)
            if (store) newPayload.storeId = store.uuid
        }

        const accessToken = this.jwtService.sign(newPayload)
        const refreshToken = this.jwtService.sign(newPayload, { expiresIn: '7d' })

        return { accessToken, refreshToken }
    }

    async doLogout() {

    }

    async resetPassword(token: string, newPassword: string) {
        const otp = await this.otpService.getOtpByToken(token)
        if (!otp) throw new NotFoundException('Invalid Token')

        const user = await this.usersService.getUserByUuid(otp.user.uuid)
        if (!otp) throw new NotFoundException('User not found')

        // Update to new password
        user.password = newPassword
        await this.usersService.updateUser(user)

        // Invalidate Token so it can't be used again
        await this.otpService.invalidateToken(otp)

        return 'Reset Password Success'
    }

    async changePassword() {

    }
}