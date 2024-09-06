import CategoryListing from "../../../screens/categories/category-listing.screen"
import ShopByCategory from "../../../screens/categories/shop-by-category.screen"
import { SCREENS } from "./stack-screen-name-list.config"

export const STACK_CATEGORY_SCREEN = [
    {
        name: SCREENS.CATEGORY.CATEGORY_LISTING,
        title: 'CategoryStack',
        component: CategoryListing,
        noHeader: true
    },
    {
        name: SCREENS.CATEGORY.SHOP_BY_CATEGORY,
        title: 'CategoryStack',
        component: ShopByCategory,
        noHeader: true
    }
]

export const STACK_PRODUCT_SCREEN = []