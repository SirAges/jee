import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "@/app/api/apiSlice";
const DATABASE_ID = process.env.EXPO_PUBLIC_DATABASE_ID;
const REVIEW_COLLECTION_ID = process.env.EXPO_PUBLIC_REVIEW_COLLECTION_ID

const reviewsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.$createdAt - a.$createdAt
});

const initialState = reviewsAdapter.getInitialState();

export const reviewsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getReviews: builder.query({
            query: () => ({
                url: `/databases/${DATABASE_ID}/collections/${REVIEW_COLLECTION_ID}/documents`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Review", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Review", id }))
                    ];
                } else return [{ type: "Review", id: "LIST" }];
            }
        }),
        getReview: builder.query({
            query: reviewId => ({
                url: `/databases/${DATABASE_ID}/collections/${REVIEW_COLLECTION_ID}/documents/${reviewId}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Review", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Review", id }))
                    ];
                } else return [{ type: "Review", id: "LIST" }];
            }
        }),
        getUserReview: builder.query({
            query: userId => ({
                url: `/databases/${DATABASE_ID}/collections/${REVIEW_COLLECTION_ID}/documents`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Review", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Review", id }))
                    ];
                } else return [{ type: "Review", id: "LIST" }];
            }
        }),
        getProductReview: builder.query({
            query: productId => ({
                url: `/databases/${DATABASE_ID}/collections/${REVIEW_COLLECTION_ID}/documents`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Review", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Review", id }))
                    ];
                } else return [{ type: "Review", id: "LIST" }];
            }
        }),

        updateReview: builder.mutation({
            query: ({ reviewId, value }) => ({
                url: `/databases/${DATABASE_ID}/collections/${REVIEW_COLLECTION_ID}/documents/${reviewId}`,
                method: "PATCH",
                body: value
                //
            })
        }),
        addNewReview: builder.mutation({
            query: value => ({
                url: `/databases/${DATABASE_ID}/collections/${REVIEW_COLLECTION_ID}/documents`,
                method: "POST",
                body: value
            }),
            invalidatesTags: (result, error, arg) => {
                console.log(result, arg, error);
                return [{ type: "Review", id: arg.id }];
            }
        }),
        deleteReview: builder.mutation({
            query: reviewId => ({
                url: `/databases/${DATABASE_ID}/collections/${REVIEW_COLLECTION_ID}/documents/${reviewId}`,
                method: "DELETE"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Review", id: arg.id }
            ]
        })
    })
});

export const {
    useGetReviewsQuery,
    useGetReviewQuery,
    useGetProductReviewQuery,
    useGetUserReviewQuery,
    useAddNewReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation
} = reviewsApiSlice;

// returns the query result object
export const selectReviewsResult =
    reviewsApiSlice.endpoints.getReviews.select();

// creates memoized selector
const selectReviewsData = createSelector(
    selectReviewsResult,
    reviewsResult => reviewsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllReviews,
    selectById: selectReviewById,
    selectIds: selectReviewIds
    // Pass in a selector that returns the reviews slice of state
} = reviewsAdapter.getSelectors(
    state => selectReviewsData(state) ?? initialState
);
