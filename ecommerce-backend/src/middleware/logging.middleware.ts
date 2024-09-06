import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
    private readonly logger = new Logger('RequestLogging');
    
    use(req: Request, res: Response, next: NextFunction) {
        this.logger.log(`Endpoint hit: ${req.method} ${req.originalUrl}`);
        this.logger.log(`Request Header: ${JSON.stringify(req.headers)}`);
        this.logger.log(`Request Body: ${JSON.stringify(req.body)}`);
        next();
    }
}