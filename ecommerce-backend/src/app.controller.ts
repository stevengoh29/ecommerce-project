import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return "Hello from V1";
  }

  @Version('2')
  @Get()
  getHelloV2(): string {
    return "Hello from V2";
  }
}
