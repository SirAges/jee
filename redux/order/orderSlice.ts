import { createSlice } from "@reduxjs/toolkit";
const orderSlice = createSlice({
    name: "order",
    initialState: {
        order: []
    },
    reducers: {
        addToOrder: (state, action) => {
            const orderItem = action.payload;
            const oldOrder = state.order;
            state.order = [...oldOrder, orderItem];
        },

        updateOrder: (state, action) => {
            const { id, update } = action.payload;
            if (update === "minus") {
                const obj = state.order.map(f =>
                    f.id === id ? { ...f, qty: f.qty > 1 ? f.qty - 1 : 1 } : f
                );
                state.order = obj;
            }
            if (update === "add") {
                const obj = state.order.map(f =>
                    f.id === id ? { ...f, qty: f.qty + 1 } : f
                );
                state.order = obj;
            }
        },

        removeFromOrder: (state, action) => {
        
            const order = state.order;
            const filtered = order.filter(f => f.id !== action.payload);
            state.order = filtered;
        }
    }
});

export const { addToOrder, updateOrder,removeFromOrder } = orderSlice.actions;

export default orderSlice.reducer;

export const selectCurrentOrder = state => state.order.order;
