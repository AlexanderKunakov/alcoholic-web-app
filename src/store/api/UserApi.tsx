import React from 'react';
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {RootState} from "../Store";
import {UserResponse} from "../../dto/reponse/UserResponse";
import {ALCOHOLIC_URL} from "../../util/EnvUtil";

export const userApi = createApi({
    reducerPath: "user",
    baseQuery: fetchBaseQuery({
        baseUrl: `${ALCOHOLIC_URL}/api/alcoholic/alcoholic`,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).authReducer.token

            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        }
    }),
    endpoints: (build) => ({
        getUserByEmail: build.query<UserResponse, string>({
            query: (email: string) => ({
                url: `/email/${email}`,
            }),
        }),
        getUserById: build.query<UserResponse, string>({
            query: (id: string) => ({
                url: `/${id}`,
            }),
        }),
        getOwnInfo: build.query<UserResponse, void>({
            query: () => ({
                url: "/own",
            }),
        })
    })
});

export const {
    useLazyGetUserByEmailQuery,
    useGetOwnInfoQuery,
    useLazyGetOwnInfoQuery,
    useLazyGetUserByIdQuery
} = userApi;
