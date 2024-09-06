import { HttpException, HttpStatus } from "@nestjs/common";

export class ServerException extends HttpException {
    constructor() {
        super("An error has occured while processing your request. Please try again later", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}