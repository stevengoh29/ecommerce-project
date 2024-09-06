import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const DATABASE_CONFIG: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Admin123',
    database: 'ecommerce_dev',
    autoLoadEntities: true,
    synchronize: true,
}