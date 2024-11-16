import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderState } from '@interfaces/store/OrderSlice.interface';

const initialState: OrderState = {
    orderId: null,
    approvalUrl: null,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrderDetails: (state, action: PayloadAction<{ orderId: number; approvalUrl: string }>) => {
            state.orderId = action.payload.orderId;
            state.approvalUrl = action.payload.approvalUrl;
        },
        clearOrder: (state) => {
            state.orderId = null;
            state.approvalUrl = null;
        },
    },
});

export const { setOrderDetails, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
