import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: "loading",
    initialState: {
        loading: false
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = !state.loading;
        }
    }
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;

export const selectCurrentLoading = state => state.loading.loading;
