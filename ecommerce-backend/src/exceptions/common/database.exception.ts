import { HttpException, HttpStatus } from "@nestjs/common";

export class DatabaseException extends HttpException {
    constructor() {
        super("An error has occured in database. Please try again later", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}