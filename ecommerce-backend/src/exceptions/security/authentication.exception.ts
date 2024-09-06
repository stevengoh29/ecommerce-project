import { HttpException, HttpStatus } from "@nestjs/common";

export class AuthenticationException extends HttpException {
    constructor(message?: string) {
        const errorMessage = message ? message : 'Invalid username or password. Please try again'
        super(errorMessage, HttpStatus.UNAUTHORIZED);
    }
}