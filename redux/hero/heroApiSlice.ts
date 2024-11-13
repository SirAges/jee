import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "@/app/api/apiSlice";
const DATABASE_ID = process.env.EXPO_PUBLIC_DATABASE_ID;

const  HERO_COLLECTION_ID =process.env.EXPO_PUBLIC_HERO_COLLECTION_ID
const herosAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.$createdAt - a.$createdAt
});

const initialState = herosAdapter.getInitialState();

export const herosApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getHeros: builder.query({
            query: () => ({
                url: `/databases/${DATABASE_ID}/collections/${HERO_COLLECTION_ID}/documents`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Hero", id }))
                    ];
                } else return [{ type: "Hero", id: "LIST" }];
            }
        }),
        getHero: builder.query({
            query: heroId => ({
                url: `/databases/${DATABASE_ID}/collections/${HERO_COLLECTION_ID}/documents/66acb740002853f7f1a0`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Hero", id }))
                    ];
                } else return [{ type: "Hero", id: "LIST" }];
            }
        }),

        updateHero: builder.mutation({
            query: value => ({
                url: `/databases/${DATABASE_ID}/collections/${HERO_COLLECTION_ID}/documents/66acb740002853f7f1a0`,
                method: "PATCH",
                body: value
                // responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => {
                console.log(result, arg, error);
                return [{ type: "Hero", id: arg.id }];
            }
        })
    })
});

export const { useGetHerosQuery, useGetHeroQuery, useUpdateHeroMutation } =
    herosApiSlice;

// returns the query result object
export const selectHerosResult = herosApiSlice.endpoints.getHeros.select();

// creates memoized selector
const selectHerosData = createSelector(
    selectHerosResult,
    herosResult => herosResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllHeros,
    selectById: selectHeroById,
    selectIds: selectHeroIds
    // Pass in a selector that returns the heros slice of state
} = herosAdapter.getSelectors(state => selectHerosData(state) ?? initialState);
