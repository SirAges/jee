import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: "user",
    initialState: {
        user: []
    },
    reducers: {
        addToCart: (state, action) => {
            const userItem = action.payload;
            const oldCart = state.user;
            state.user = [...oldCart, userItem];
        },

        updateCart: (state, action) => {
            const { id, update } = action.payload;
            if (update === "minus") {
                const obj = state.user.map(f =>
                    f.id === id ? { ...f, qty: f.qty > 1 ? f.qty - 1 : 1 } : f
                );
                state.user = obj;
            }
            if (update === "add") {
                const obj = state.user.map(f =>
                    f.id === id ? { ...f, qty: f.qty + 1 } : f
                );
                state.user = obj;
            }
        },

        removeFromCart: (state, action) => {
        
            const user = state.user;
            const filtered = user.filter(f => f.id !== action.payload);
            state.user = filtered;
        }
    }
});

export const { addToCart, updateCart,removeFromCart } = userSlice.actions;

export default userSlice.reducer;

export const selectCurrentCart = state => state.user.user;
