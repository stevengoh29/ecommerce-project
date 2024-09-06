import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Response, Request } from 'express'
import { ResponseUtil } from "src/utils/response.util";
import { AuthService } from "./auth.service";
import { ReqLoginDto } from "./dto/req-login.dto";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { ReqResetPassDto } from "./dto/req-reset-pass.dto";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { AuthedRequest } from "./types/authed-request.type";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { ReqRefreshDto } from "./dto/req-refresh.dto";

@Controller('auth')
export class AuthController {
    builder = new ResponseUtil()

    constructor(
        private authService: AuthService
    ) { }

    @Get('get-profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(
        @Req() req: AuthedRequest,
        @Res() res: Response
    ) {
        const user = req.user
        return this.builder.buildResponse(res, user)
    }

    @Post('login')
    async login(
        @Res() res: Response,
        @Body(new ValidationPipe()) body: ReqLoginDto
    ) {
        const { username, password } = body
        const result = await this.authService.doLogin(username, password)
        return this.builder.buildResponse(res, result)
    }

    @Post('refresh')
    async refresh(
        @Res() res: Response,
        @Body(new ValidationPipe()) body: ReqRefreshDto
    ) {
        const { refreshToken } = body
        const result = await this.authService.doRefreshToken(refreshToken)
        return this.builder.buildResponse(res, result)
    }

    @Post('register')
    async register(
        @Body(new ValidationPipe()) createUserDto: CreateUserDto,
        @Res() res: Response,
    ) {
        const result = await this.authService.doRegister(createUserDto)
        return this.builder.buildResponse(res, result)
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    async logout(
        @Req() req: AuthedRequest,
        @Res() res: Response
    ) {
        return this.builder.buildResponse(res, "oke")
    }

    @Post('reset-password')
    async resetPassword(
        @Res() res: Response,
        @Body(new ValidationPipe()) body: ReqResetPassDto
    ) {
        const result = await this.authService.resetPassword(body.token, body.newPassword)
        return this.builder.buildResponse(res, result)
    }
}