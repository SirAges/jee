import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

import { apiSlice } from "@/app/api/apiSlice";
const DATABASE_ID = process.env.EXPO_PUBLIC_DATABASE_ID;
const USER_COLLECTION_ID =process.env. EXPO_PUBLIC_USER_COLLECTION_ID

const usersAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.$createdAt - a.$createdAt
});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => ({
                url: `/databases/${DATABASE_ID}/collections/${USER_COLLECTION_ID}/documents`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "User", id: "LIST" },
                        ...result.ids.map(id => ({ type: "User", id }))
                    ];
                } else return [{ type: "User", id: "LIST" }];
            }
        }),
        getUser: builder.query({
            query: userId => ({
                url: `/databases/${DATABASE_ID}/collections/${USER_COLLECTION_ID}/documents/${userId}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            })
        }),

        updateUser: builder.mutation({
            query: ({ userId, value }) => ({
                url: `/databases/${DATABASE_ID}/collections/${USER_COLLECTION_ID}/documents/${userId}`,
                method: "PATCH",
                body: value
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "User", id: arg.id }
            ]
        }),
        addNewUser: builder.mutation({
            query: value => ({
                url: `/databases/${DATABASE_ID}/collections/${USER_COLLECTION_ID}/documents`,
                method: "POST",
                body: value
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "User", id: arg.id }
            ]
        }),
        deleteUser: builder.mutation({
            query: userId => ({
                url: `/databases/${DATABASE_ID}/collections/${USER_COLLECTION_ID}/documents/${userId}`,
                method: "DELETE"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "User", id: arg.id }
            ]
        })
    })
});

export const {
    useGetUsersQuery,
    useGetUserQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = usersApiSlice;

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// creates memoized selector
const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
    // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState);
