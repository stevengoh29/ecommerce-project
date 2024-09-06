import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_CONFIG } from './config/database.config';
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

@Module({
  imports: [
    TypeOrmModule.forRoot(DATABASE_CONFIG),
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
