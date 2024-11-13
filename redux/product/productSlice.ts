import { createSlice } from "@reduxjs/toolkit";
const productSlice = createSlice({
    name: "product",
    initialState: {
        product: [],
        recent: []
    },
    reducers: {
        addToRecent: (state, action) => {
            const recentItem = action.payload;

            const oldRecent = state.recent;
            const found = oldRecent.find(
                o => o.productId === recentItem.productId
            );
            if (!found) {
                state.recent = [...oldRecent, recentItem];
            }
        },

        removeFromRecent: (state, action) => {
            const recent = state.recent;
            const filtered = recent.filter(f => f.productId !== action.payload);
            state.recent = filtered;
        },
        clearRecent: (state, action) => {
            state.recent = [];
        }
    }
});

export const { addToRecent, removeFromRecent, clearRecent } =
    productSlice.actions;

export default productSlice.reducer;

export const selectRecent = state => state.product.recent;
