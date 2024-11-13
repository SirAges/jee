import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { setSession, logOut } from "@/redux/auth/authSlice";
import { apiSlice } from "@/app/api/apiSlice";
const authAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.$createdAt - a.$createdAt
});

const initialState = authAdapter.getInitialState();

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCurrent: builder.query({
            query: () => ({
                url: "/account",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError;
                }
            }),

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: "Auth", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Auth", id }))
                    ];
                } else return [{ type: "Auth", id: "LIST" }];
            }
        }),
        signOut: builder.mutation({
            query: id => ({
                url: `account/sessions/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Auth", id: arg.id }
            ],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    
                    const { data } = await queryFulfilled;
                    if (!data) {
                        dispatch(logOut());
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        }),

        signIn: builder.mutation({
            query: value => ({
                url: `/account/sessions/email`,
                method: "POST",
                body: value
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Auth", id: arg.id }
            ],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    if (data && data !== undefined) {
                        dispatch(setSession(data));
                    }
                } catch (err) {
                    console.log("queryerror", err);
                }
            }
        }),
        signUp: builder.mutation({
            query: value => ({
                url: `/account`,
                method: "POST",
                body: value
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Auth", id: arg.id }
            ],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (err) {
                    console.log(err);
                }
            }
        }),
        passwordRecovery: builder.mutation({
            query: value => ({
                url: `/account`,
                method: "POST",
                body: value,
                responseHandler: "text"
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Auth", id: arg.id }
            ],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (err) {
                    console.log(err);
                }
            }
        }),
        updateAccount: builder.mutation({
            query: ({ value, field, password }) => ({
                url: `/account/${field === "oldPassword" ? "password" : field}`,
                method: "PATCH",
                body: {
                    [field]: value,
                    password
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Auth", id: arg.id }
            ]
        })
    })
});

export const {
    useGetCurrentQuery,
    useSignOutMutation,
    useSignInMutation,
    useSignUpMutation,
    usePasswordRecoveryMutation,
    useUpdateAccountMutation
} = authApiSlice;

// returns the query result object
export const selectAuthResult = authApiSlice.endpoints.getCurrent.select();

// creates memoized selector
const selectAuthData = createSelector(
    selectAuthResult,
    authResult => authResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllAuth,
    selectById: selectAuthById,
    selectIds: selectAuthIds
    // Pass in a selector that returns the auth slice of state
} = authAdapter.getSelectors(state => selectAuthData(state) ?? initialState);
