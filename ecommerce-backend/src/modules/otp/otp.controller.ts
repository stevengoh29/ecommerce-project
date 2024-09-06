import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from 'express'
import { ResponseUtil } from "src/utils/response.util";
import { OtpService } from "./otp.service";
import { ReqSendOtpDto } from "./dto/req-send-otp.dto";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { ReqVerifyOtpDto } from "./dto/req-verify-otp.dto";

@Controller('otp')
export class OtpController {
    builder = new ResponseUtil()

    constructor(
        private readonly otpService: OtpService
    ) { }

    @Post('send')
    async sendOtp(
        @Res() res: Response,
        @Body(new ValidationPipe()) body: ReqSendOtpDto
    ) {
        const otp = await this.otpService.sendOtpByUserEmail(body.email)
        return this.builder.buildResponse(res, otp)
    }

    @Post('verify')
    async verifyOtp(
        @Res() res: Response,
        @Body(new ValidationPipe()) body: ReqVerifyOtpDto
    ) {
        const otp = await this.otpService.verifyOtp(body.token, body.otp)
        return this.builder.buildResponse(res, otp)
    }
}