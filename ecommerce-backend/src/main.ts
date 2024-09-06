import { NestFactory } from '@nestjs/core';
import { UnprocessableEntityException } from '@nestjs/common'
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { extractAllErrors } from './utils/validation.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  // Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'api/v',
  });

  // Validation
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true, // Transform payloads to objects typed based on DTO
  //     whitelist: true, // Whitelist true to only pass acceptable properties in DTO
  //     exceptionFactory: (validationErrors) => {
  //       const errors = validationErrors.map((value) => {
  //         return extractAllErrors(value);
  //       });
  //       return new UnprocessableEntityException(...errors);
  //     },
  //   }),
  // );


  app.enableCors()

  await app.listen(4000);
}
bootstrap();
