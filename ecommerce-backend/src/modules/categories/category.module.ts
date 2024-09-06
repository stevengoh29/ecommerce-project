import { Module } from "@nestjs/common";
import { MainCategoryController } from "./main-category.controller";
import { MainCategoryService } from "./main-category.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MainCategory } from "./entities/main-category.entity";
import { SubCategoryController } from "./sub-category.controller";
import { SubCategoryService } from "./sub-category.service";
import { SubCategory } from "./entities/sub-category.entity";
import { StoreService } from "../stores/store.service";
import { Store } from "../stores/entities/store.entity";
import { UsersService } from "../users/user.service";
import { User } from "../users/entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([MainCategory, SubCategory, Store, User])],
    controllers: [MainCategoryController, SubCategoryController],
    providers: [MainCategoryService, SubCategoryService, StoreService, UsersService]
})
export class CategoryModule { }