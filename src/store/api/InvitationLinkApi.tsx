import React from 'react';
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {RootState} from "../Store";
import {IdResponse} from "../../dto/reponse/IdResponse";

export const invitationLinkApi = createApi({
    reducerPath: "invitationLink",
    baseQuery: fetchBaseQuery({
        baseUrl: `api/alcoparty/link`,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).authReducer.token

            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        }
    }),
    endpoints: (build) => ({
        createLink: build.mutation<IdResponse, string>({
            query: (eventId: string) => ({
                url: `/${eventId}`,
                method: "POST",
            }),
        }),
        joinEventByLink: build.mutation<IdResponse, string>({
            query: (eventId: string) => ({
                url: `/${eventId}`,
                method: "PUT",
            }),
        }),
    })
});

export const {useCreateLinkMutation, useJoinEventByLinkMutation} = invitationLinkApi;
