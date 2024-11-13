import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: []
    },
    reducers: {
        addToCart: (state, action) => {
            const cartItem = action.payload;
            const oldCart = state.cart;
            state.cart = [...oldCart, cartItem];
        },

        updateCart: (state, action) => {
            const { $id, update } = action.payload;
            if (update === "minus") {
                const obj = state.cart.map(f =>
                    f.$id === $id ? { ...f, qty: f.qty > 1 ? f.qty - 1 : 1 } : f
                );
                state.cart = obj;
            }
            if (update === "add") {
                const obj = state.cart.map(f =>
                    f.$id === $id ? { ...f, qty: f.qty + 1 } : f
                );
                state.cart = obj;
            }
        },

        removeFromCart: (state, action) => {
            
            const cart = state.cart;
            const filtered = cart.filter(f => f.$id !== action.payload);
            state.cart = filtered;
        },
        clearCart: (state, action) => {
            state.cart = [];
        }
    }
});

export const { addToCart, updateCart, removeFromCart,clearCart } = cartSlice.actions;

export default cartSlice.reducer;

export const selectCurrentCart = state => state.cart.cart;
