import { HttpException, HttpStatus } from "@nestjs/common";

export class MandatoryFieldException extends HttpException {
    constructor() {
        super("Missing required fields in request.", HttpStatus.BAD_REQUEST);
    }
}