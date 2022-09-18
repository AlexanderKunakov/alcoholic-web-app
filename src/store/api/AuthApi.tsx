import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {AccessTokenDto} from "../../dto/AccessTokenDto";
import {RootState} from "../Store";
import {UserCredentialsEntity} from "../../entity/UserCredentialsEntity";
import {ErrorDto} from "../../dto/ErrorDto";
import {ALCOHOLIC_URL} from "../../util/EnvUtil";

export const authApi = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({
        baseUrl: `${ALCOHOLIC_URL}/api/alcoholic`,
        credentials: "include",
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).authReducer.token

            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        },
    }) as unknown as BaseQueryFn<string | FetchArgs, unknown, ErrorDto>,
    tagTypes: ["Auth"],
    endpoints: (build) => ({
        register: build.mutation<void, FormData>({
            query: (formData: FormData) => ({
                url: "/register",
                method: "POST",
                body: formData
            })
        }),
        login: build.mutation<AccessTokenDto, UserCredentialsEntity>({
            query: (credentials: UserCredentialsEntity) => ({
                url: "/login",
                method: "POST",
                body: credentials
            })
        }),
        logout: build.mutation<void, void>({
            query: () => ({
                url: "/logout",
                method: "POST"
            })
        }),
        refresh: build.mutation<AccessTokenDto, void>({
            query: () => ({
                url: "/refresh",
                method: "POST"
            })
        }),
    })
});

export const {useRegisterMutation, useLoginMutation, useLogoutMutation, useRefreshMutation} = authApi;
