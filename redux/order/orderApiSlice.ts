import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "@/app/api/apiSlice";
const DATABASE_ID = process.env.EXPO_PUBLIC_DATABASE_ID;
const ORDER_COLLECTION_ID =process.env. EXPO_PUBLIC_ORDER_COLLECTION_ID

const ordersAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.$createdAt - a.$createdAt
});

const initialState = ordersAdapter.getInitialState();

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getOrders: builder.query({
            query: () => ({
                url: `/databases/${DATABASE_ID}/collections/${ORDER_COLLECTION_ID}/documents`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Order", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Order", id }))
                    ];
                } else return [{ type: "Order", id: "LIST" }];
            }
        }),
        getOrder: builder.query({
            query: orderId => ({
                url: `/databases/${DATABASE_ID}/collections/${ORDER_COLLECTION_ID}/documents/${orderId}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Order", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Order", id }))
                    ];
                } else return [{ type: "Order", id: "LIST" }];
            }
        }),
        getUserOrder: builder.query({
            query: () => ({
                url: `/databases/${DATABASE_ID}/collections/${ORDER_COLLECTION_ID}/documents`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Order", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Order", id }))
                    ];
                } else return [{ type: "Order", id: "LIST" }];
            }
        }),

        updateOrder: builder.mutation({
            query: ({ orderId, value }) => ({
                url: `/databases/${DATABASE_ID}/collections/${ORDER_COLLECTION_ID}/documents/${orderId}`,
                method: "PATCH",
                body: value
                //
            })
        }),
        addNewOrder: builder.mutation({
            query: value => ({
                url: `/databases/${DATABASE_ID}/collections/${ORDER_COLLECTION_ID}/documents`,
                method: "POST",
                body: value
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Order", id: arg.id }
            ]
        }),
        deleteOrder: builder.mutation({
            query: orderId => ({
                url: `/databases/${DATABASE_ID}/collections/${ORDER_COLLECTION_ID}/documents/${orderId}`,
                method: "DELETE"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Order", id: arg.id }
            ]
        })
    })
});

export const {
    useGetOrdersQuery,
    useGetOrderQuery,
    useGetUserOrderQuery,
    useAddNewOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation
} = ordersApiSlice;

// returns the query result object
export const selectOrdersResult = ordersApiSlice.endpoints.getOrders.select();

// creates memoized selector
const selectOrdersData = createSelector(
    selectOrdersResult,
    ordersResult => ordersResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllOrders,
    selectById: selectOrderById,
    selectIds: selectOrderIds
    // Pass in a selector that returns the orders slice of state
} = ordersAdapter.getSelectors(
    state => selectOrdersData(state) ?? initialState
);
