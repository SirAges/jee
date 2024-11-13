import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "@/app/api/apiSlice";
const DATABASE_ID = process.env.EXPO_PUBLIC_DATABASE_ID;
const PRODUCT_COLLECTION_ID =process.env.EXPO_PUBLIC_PRODUCT_COLLECTION_ID

const productsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.$createdAt - a.$createdAt
});

const initialState = productsAdapter.getInitialState();

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createFile: builder.mutation({
            query: value => ({
                url: `/storage/buckets/${BUCKET_ID}/files`,
                method: "POST",
                body: value
            })
        }),

        getProducts: builder.query({
            query: () => ({
                url: `/databases/${DATABASE_ID}/collections/${PRODUCT_COLLECTION_ID}/documents`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Product", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Product", id }))
                    ];
                } else return [{ type: "Product", id: "LIST" }];
            }
        }),

        getProduct: builder.query({
            query: productId => ({
                url: `/databases/${DATABASE_ID}/collections/${PRODUCT_COLLECTION_ID}/documents/${productId}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            })
        }),
        getSearchProduct: builder.query({
            query: searched => ({
                url: `/databases/${DATABASE_ID}/collections/${PRODUCT_COLLECTION_ID}/documents`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            })
        }),

        filterProduct: builder.query({
            query: productId => ({
                url: `/databases/${DATABASE_ID}/collections/${PRODUCT_COLLECTION_ID}/documents`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            })
        }),

        updateProduct: builder.mutation({
            query: ({ productId, value }) => ({
                url: `/databases/${DATABASE_ID}/collections/${PRODUCT_COLLECTION_ID}/documents/${productId}`,
                method: "PATCH",
                body: value
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Product", id: arg.id }
            ]
        }),
        addNewProduct: builder.mutation({
            query: value => ({
                url: `/databases/${DATABASE_ID}/collections/${PRODUCT_COLLECTION_ID}/documents`,
                method: "POST",
                body: value
                //
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Product", id: arg.id }
            ]
        }),
        deleteProduct: builder.mutation({
            query: productId => ({
                url: `/databases/${DATABASE_ID}/collections/${PRODUCT_COLLECTION_ID}/documents/${productId}`,
                method: "DELETE"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Product", id: arg.id }
            ]
        })
    })
});

export const {
    useCreateFileMutation,
    useGetProductsQuery,
    useGetSearchProductQuery,
    useGetProductQuery,
    useAddNewProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productsApiSlice;

// returns the query result object
export const selectProductsResult =
    productsApiSlice.endpoints.getProducts.select();

// creates memoized selector
const selectProductsData = createSelector(
    selectProductsResult,
    productsResult => productsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
    selectIds: selectProductIds
    // Pass in a selector that returns the products slice of state
} = productsAdapter.getSelectors(
    state => selectProductsData(state) ?? initialState
);
