import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Action } from "@reduxjs/toolkit";
import { REHYDRATE } from "redux-persist";

type RootState = any; // normally inferred from state

function isHydrateAction(action: Action): action is Action<typeof REHYDRATE> & {
    key: string;
    payload: RootState;
    err: unknown;
} {
    return action.type === REHYDRATE;
}
const ENDPOINT = process.env.EXPO_PUBLIC_ENDPOINT;
const PROJECT_ID = process.env.EXPO_PUBLIC_PROJECT_ID;
const baseQuery = fetchBaseQuery({
    baseUrl: ENDPOINT,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        headers.set("Content-Type", "application/json");
        headers.set("X-Appwrite-Project", PROJECT_ID);

        return headers;
    }
});



export const apiSlice = createApi({
    baseQuery: baseQuery,
    extractRehydrationInfo(action, { reducerPath }): any {
        if (isHydrateAction(action)) {
            // when persisting thn e api reducer
            if (action.key === "doerkey") {
                return action.payload;
            }

            // When persisting the root reducer
            return action?.payload
                ? action.payload[apiSlice.reducerPath]
                : null;
        }
    },
    tagTypes: ["Auth", "Order", "Product", "Review", "Order", "Hero", "User"],
    endpoints: builder => ({})
});

