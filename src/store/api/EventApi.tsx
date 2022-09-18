import React from 'react';
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {RootState} from "../Store";
import {MultipleEventResponse} from "../../dto/reponse/MultipleEventResponse";
import {EventResponse} from "../../dto/reponse/EventResponse";
import {SingleEventResponse} from "../../dto/reponse/SingleEventResponse";
import {IdResponse} from "../../dto/reponse/IdResponse";
import {PaginationResponse} from "../../dto/reponse/PaginationResponse";
import {PaginationParamModel} from "../../model/PaginationParamModel";
import {ALCOPARTY_URL} from "../../util/EnvUtil";

export const eventApi = createApi({
    reducerPath: "event",
    baseQuery: fetchBaseQuery({
        baseUrl: `${ALCOPARTY_URL}/api/alcoparty/event`,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).authReducer.token

            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        }
    }),
    tagTypes: ["EVENTS", "OWN_EVENTS", "SINGLE_EVENT"],
    endpoints: (build) => ({
        getAllEvents: build.query<PaginationResponse<MultipleEventResponse>, PaginationParamModel>({
            query: (pagination) => ({
                url: "",
                params: pagination,
            }),
            providesTags: ["EVENTS"],
        }),
        getEvent: build.query<SingleEventResponse, string>({
            query: (id: string) => ({
                url: `/${id}`
            }),
            providesTags: ["SINGLE_EVENT"],
        }),
        getByInvitationLink: build.query<SingleEventResponse, string>({
            query: (invitationLink: string) => ({
                url: `/link/${invitationLink}`,
            }),
        }),
        getAllOwnEvents: build.query<PaginationResponse<EventResponse>, PaginationParamModel>({
            query: (pagination) => ({
                url: "/own",
                params: pagination,
            }),
            providesTags: () => ["OWN_EVENTS"],
        }),
        postEvent: build.mutation<IdResponse, FormData>({
            query: (formData: FormData) => ({
                url: "",
                method: "POST",
                body: formData
            }),
            invalidatesTags: () => ["EVENTS"],
        }),
        joinEvent: build.mutation<IdResponse, string>({
            query: (eventId: string) => ({
                url: `/join/${eventId}`,
                method: "PUT",
            }),
            invalidatesTags: () => ["EVENTS", "SINGLE_EVENT"],
        }),
        leaveEvent: build.mutation<void, string>({
            query: (eventId: string) => ({
                url: `/leave/${eventId}`,
                method: "PUT",
            }),
            invalidatesTags: () => ["EVENTS", "SINGLE_EVENT"],
        }),
        disbandEvent: build.mutation<void, string>({
            query: (eventId: string) => ({
                url: `/disband/${eventId}`,
                method: "PUT",
            }),
            invalidatesTags: () => ["EVENTS", "SINGLE_EVENT"],
        }),
    })
});

export const {
    useGetAllEventsQuery,
    useLazyGetAllEventsQuery,
    usePostEventMutation,
    useLazyGetAllOwnEventsQuery,
    useLazyGetEventQuery,
    useGetByInvitationLinkQuery,
    useGetEventQuery,
    useJoinEventMutation,
    useLeaveEventMutation,
    useDisbandEventMutation,
} = eventApi;
