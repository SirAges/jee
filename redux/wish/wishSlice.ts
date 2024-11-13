import { createSlice } from "@reduxjs/toolkit";
const wishSlice = createSlice({
    name: "wish",
    initialState: {
        wish: []
    },
    reducers: {
        addToWish: (state, action) => {
            const wishItem = action.payload;
            const found = state.wish.some(s => s.$id === wishItem.$id);
            if (found) {
                return;
            }
            const oldWish = state.wish;
            state.wish = [...oldWish, wishItem];
        },

        updateWish: (state, action) => {
            const { $id, update } = action.payload;
            if (update === "minus") {
                const obj = state.wish.map(f =>
                    f.$id === $id ? { ...f, qty: f.qty > 1 ? f.qty - 1 : 1 } : f
                );
                state.wish = obj;
            }
            if (update === "add") {
                const obj = state.wish.map(f =>
                    f.$id === $id ? { ...f, qty: f.qty + 1 } : f
                );
                state.wish = obj;
            }
        },

        removeFromWish: (state, action) => {
          
            const wish = state.wish;
            const filtered = wish.filter(f => f.$id !== action.payload);
            state.wish = filtered;
        },clearWish: (state, action) => {
            state.wish = [];
        }
    }
});

export const { addToWish, updateWish, removeFromWish,clearWish } = wishSlice.actions;

export default wishSlice.reducer;

export const selectCurrentWish = state => state.wish.wish;
