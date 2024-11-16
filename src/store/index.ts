import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@store/slices/AuthSlice';
import cartReducer from '@store/slices/cartSlice';
import orderReducer from '@store/slices/orderSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        order: orderReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
