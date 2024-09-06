export const API_PATH = {
    auth: {
        login: '/auth/login',
        register: '/auth/register',
        logout: '/auth/logout',
        refresh: 'auth/refresh',
        'reset-password': '/auth/reset-password',
        'get-profile': '/auth/get-profile'
    },
    category: {
        main: {
            getAll: '/category/main-category',
            getById: '/category/main-category/:uuid',
            create: '/category/main-category',
            update: '/category/main-category/:uuid',
            delete: '/category/main-category/:uuid'
        },
        sub: {
            getAll: '/category/sub-category',
            getById: '/category/sub-category/:uuid',
            getByStore: 'category/sub-category/get-by-store/:uuid',
            create: '/category/sub-category',
            update: '/category/sub-category/:uuid',
            delete: '/category/sub-category/:uuid'
        }
    },
    products: {
        product: {
            getAll: '/product',
            getById: '/product/:uuid',
            create: '/product',
            update: '/product/:uuid',
            delete: '/product/:uuid',
        },
        productDisplay: {
            getAll: '/product-display',
            getById: '/product-display/:uuid',
            create: '/product-display',
            update: '/product-display/:uuid',
            delete: '/product-display/:uuid',
        }
    },
    stores: {
        getAll: '/store',
        getById: '/store/:uuid',
        getDetailedById: '/store/:uuid/get-detailed',
        create: '/store',
        update: '/store/:uuid',
        delete: '/store/:uuid'
    },
    uploads: {
        single: '/upload/single',
        multiple: '/upload/multiple'
    },
    users: {
        getAll: '/user'
    },
}