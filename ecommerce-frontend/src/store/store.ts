import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from "./reducer/user.reducer"

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['users'] //Whitelist = Only users is persisted.
}

const rootReducer = combineReducers({
    users: userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefailtMiddleware => getDefailtMiddleware({ serializableCheck: false })
})

export const persistor = persistStore(store)

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']