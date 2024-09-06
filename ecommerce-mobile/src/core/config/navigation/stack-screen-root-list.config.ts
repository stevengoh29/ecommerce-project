import BottomTabScreen from "../../../components/navigation/bottom-tab.navigation"
import CategoryStackScreen from "../../../components/navigation/stacks/category.stack"
import CategoryListing from "../../../screens/categories/category-listing.screen"
import ShopByCategory from "../../../screens/categories/shop-by-category.screen"
import ProductById from "../../../screens/product/product-by-id.screen"
import { SCREENS } from "./stack-screen-name-list.config"


export const STACK_ROOT_SCREEN = [
    {
        name: SCREENS.BOTTOM_TAB,
        title: 'BottomTabScreen',
        component: BottomTabScreen,
        noHeader: true
    },
    {
        name: SCREENS.CATEGORY.CATEGORY_LISTING,
        title: 'CategoryListing',
        component: CategoryListing,
        noHeader: true
    },
    {
        name: SCREENS.CATEGORY.SHOP_BY_CATEGORY,
        title: 'ShopByCategory',
        component: ShopByCategory,
        noHeader: true
    },
    {
        name: SCREENS.PRODUCT.PRODUCT_BY_ID,
        title: 'Product By Id',
        component: ProductById,
        noHeader: true
    }
]