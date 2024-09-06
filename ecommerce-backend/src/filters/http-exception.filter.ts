
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const result = {
            statusCode: status,
            message: exception.message,
            timestamp: new Date().toISOString(),
        }

        this.logger.error(exception.stack);
        this.logger.log(`Request of ${request.method} ${request.originalUrl} has been returned with: ${JSON.stringify(result)}`)

        response
            .status(status)
            .json(result);
    }
}