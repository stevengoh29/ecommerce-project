import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const DATABASE_CONFIG: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    autoLoadEntities: true,
    synchronize: true,
}


export default () => ({
    SECRET_KEY: process.env.SECRET_KEY,
    database: {
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        autoLoadEntities: true,
        synchronize: true,
    }
});
