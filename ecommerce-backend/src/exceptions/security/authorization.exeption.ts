import { HttpException, HttpStatus } from "@nestjs/common";

export class AuthorizationException extends HttpException {
    constructor() {
        super("Unauthorized. Please relogin", HttpStatus.UNAUTHORIZED);
    }
}