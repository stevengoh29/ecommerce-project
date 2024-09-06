import HomeStackScreen from "../../../components/navigation/stacks/home.stack";
import HomeScreen from "../../../screens/home/home.screen";
import ProductScreen from "../../../screens/product/product.screen";
import TransactionScreen from "../../../screens/transaction/transaction.screen";
import WishlistScreen from "../../../screens/wishlist/wishlist.screen";
import { SCREENS } from "./stack-screen-name-list.config";

export const BOTTOM_TAB_MENU = [
    {
        name: SCREENS.HOME,
        title: 'Home',
        component: HomeScreen,
        iconName: 'home',
        noHeader: true
    },
    {
        name: SCREENS.PRODUCT.PRODUCT_LISTING,
        title: 'Product',
        component: ProductScreen,
        iconName: 'pricetag',
        noHeader: true
    },
    {
        name: SCREENS.WISHLIST,
        title: 'Wishlist',
        component: WishlistScreen,
        iconName: 'heart',
        noHeader: true
    },
    {
        name: SCREENS.TRANSACTION,
        title: 'Transaction',
        component: TransactionScreen,
        iconName: 'document',
        noHeader: true
    },
]