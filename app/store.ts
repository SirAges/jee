import { configureStore, combineReducers } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./api/apiSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";
import cartReducer from "@/redux/cart/cartSlice";
import wishReducer from "@/redux/wish/wishSlice";
import authReducer from "@/redux/auth/authSlice";
import orderReducer from "@/redux/order/orderSlice";
import productReducer from "@/redux/product/productSlice";
import loadingReducer from "@/redux/loading/loadingSlice";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    blacklist: ["loading"]
};
const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    wish: wishReducer,
    cart: cartReducer,
    loading: loadingReducer,
    order: orderReducer,
    product: productReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    // reducer: {
    //     [apiSlice.reducerPath]: apiSlice.reducer,
    //     cart: cartReducer,
    //     wish: wishReducer
    // },
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            }
        }).concat(apiSlice.middleware),
    devTools: false // Enable DevTools in development only
});

export const persistor = persistStore(store);
setupListeners(store.dispatch);
