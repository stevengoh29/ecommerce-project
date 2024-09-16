import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import databaseConfig, { DATABASE_CONFIG } from './config/database.config';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/categories/category.module';
import { OtpModule } from './modules/otp/otp.module';
import { ProductModule } from './modules/products/product.module';
import { StoreModule } from './modules/stores/store.module';
import { UsersModule } from './modules/users/user.module';
import { UploadModule } from './modules/upload/upload.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { IMAGE_SERVE_DIR } from './config/application.config';
import { CouponModule } from './modules/coupons/coupon.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/database.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
        const dbConfig = configService.get('database');
        console.log(dbConfig)
        return {
          type: dbConfig.type,
          host: 'localhost',
          port: dbConfig.port,
          username: 'root',
          password: 'Mestika$123',
          database: 'ecommerce_dev',
          autoLoadEntities: dbConfig.autoLoadEntities,
          synchronize: dbConfig.synchronize,
        };
      },
    }),

    ServeStaticModule.forRoot({
      rootPath: '/app/uploads',
      serveRoot: IMAGE_SERVE_DIR
    }),
    UsersModule,
    AuthModule,
    OtpModule,
    CategoryModule,
    ProductModule,
    StoreModule,
    UploadModule,
    CouponModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
