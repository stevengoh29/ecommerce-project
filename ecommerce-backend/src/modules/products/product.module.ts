import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryModule } from "../categories/category.module";
import { SubCategoryService } from "../categories/sub-category.service";
import { ProductController } from "./controller/product.controller";
import { ProductAdditionalItem } from "./entities/product-additional-item.entity";
import { ProductVariant } from "./entities/product-variant.entity";
import { Product } from "./entities/product.entity";
import { ProductService } from "./services/product.service";
import { SubCategory } from "../categories/entities/sub-category.entity";
import { MainCategory } from "../categories/entities/main-category.entity";
import { MainCategoryService } from "../categories/main-category.service";
import { StoreModule } from "../stores/store.module";
import { StoreService } from "../stores/store.service";
import { Store } from "../stores/entities/store.entity";
import { UsersService } from "../users/user.service";
import { User } from "../users/entities/user.entity";
import { ProductDisplay } from "./entities/product-display.entity";
import { ProductDisplayService } from "./services/product-display.service";
import { ProductDisplayController } from "./controller/product-display.controller";
import { ProductVariantController } from "./controller/product-variant.controller";
import { ProductVariantService } from "./services/product-variant.service";
import { ProductAdditionalItemController } from "./controller/product-additional-item.controller";
import { ProductAdditionalItemService } from "./services/product-additional-item.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Product,
            ProductVariant,
            ProductAdditionalItem,
            ProductDisplay,
            SubCategory,
            MainCategory,
            Store,
            User
        ]),
        CategoryModule,
        StoreModule
    ],
    controllers: [
        ProductController,
        ProductDisplayController,
        ProductVariantController,
        ProductAdditionalItemController
    ],
    providers: [
        ProductService,
        SubCategoryService,
        MainCategoryService,
        StoreService,
        UsersService,
        ProductDisplayService,
        ProductVariantService,
        ProductAdditionalItemService
    ]
})
export class ProductModule { }