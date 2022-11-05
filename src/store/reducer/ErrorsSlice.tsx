import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authApi} from "../api/AuthApi";
import ErrorUtil from "../../util/ErrorUtil";
import {eventApi} from "../api/EventApi";
import {invitationLinkApi} from "../api/InvitationLinkApi";
import {userApi} from "../api/UserApi";

interface IErrors {
    errorsList: string[],
}

const ErrorsContextDefaults: IErrors = {
    errorsList: []
}

function f(errorList: string[], error: unknown): string[] {
    return [...new Set([...errorList, ErrorUtil.resolve(error)])];
}

export const errorsSlice = createSlice({
    name: "errors",
    initialState: ErrorsContextDefaults,
    reducers: {
        removeError(state, action: PayloadAction<string>) {
            state.errorsList = state.errorsList.filter(err => err !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.login.matchRejected, (state, action) => {
                state.errorsList = f(state.errorsList, action.payload);
            }
        );
        builder.addMatcher(
            authApi.endpoints.logout.matchRejected, (state, action) => {
                state.errorsList = f(state.errorsList, action.payload);
            }
        );
        builder.addMatcher(
            authApi.endpoints.register.matchRejected, (state, action) => {
                state.errorsList = f(state.errorsList, action.payload);
            }
        );
        builder.addMatcher(
            authApi.endpoints.refresh.matchRejected, (state, action) => {
                state.errorsList = f(state.errorsList, action.payload);
            }
        );


        builder.addMatcher(
            eventApi.endpoints.joinEvent.matchRejected, (state, action) => {
                state.errorsList = f(state.errorsList, action.payload);
            }
        );
        builder.addMatcher(
            eventApi.endpoints.postEvent.matchRejected, (state, action) => {
                state.errorsList = f(state.errorsList, action.payload);
            }
        );
        builder.addMatcher(
            eventApi.endpoints.disbandEvent.matchRejected, (state, action) => {
                state.errorsList = f(state.errorsList, action.payload);
            }
        );
        builder.addMatcher(
            eventApi.endpoints.leaveEvent.matchRejected, (state, action) => {
                state.errorsList = f(state.errorsList, action.payload);
            }
        );
        builder.addMatcher(
            eventApi.endpoints.getAllEvents.matchRejected, (state, action) => {
                state.errorsList = f(state.errorsList, action.payload);
            }
        );
        builder.addMatcher(
            eventApi.endpoints.getAllOwnEvents.matchRejected, (state, action) => {
                state.errorsList = f(state.errorsList, action.payload);
            }
        );
        builder.addMatcher(
            eventApi.endpoints.getEvent.matchRejected, (state, action) => {
                state.errorsList = f(state.errorsList, action.payload);
            }
        );
        builder.addMatcher(
            eventApi.endpoints.getByInvitationLink.matchRejected, (state, action) => {
                state.errorsList = f(state.errorsList, action.payload);
            }
        );


        builder.addMatcher(
            invitationLinkApi.endpoints.createLink.matchRejected, (state, action) => {
                state.errorsList = f(state.errorsList, action.payload);
            }
        );
        builder.addMatcher(
            invitationLinkApi.endpoints.joinEventByLink.matchRejected, (state, action) => {
                state.errorsList = f(state.errorsList, action.payload);
            }
        );


        builder.addMatcher(
            userApi.endpoints.getUserById.matchRejected, (state, action) => {
                state.errorsList = f(state.errorsList, action.payload);
            }
        );
        builder.addMatcher(
            userApi.endpoints.getUserByEmail.matchRejected, (state, action) => {
                state.errorsList = f(state.errorsList, action.payload);
            }
        );
        builder.addMatcher(
            userApi.endpoints.getOwnInfo.matchRejected, (state, action) => {
                state.errorsList = f(state.errorsList, action.payload);
            }
        );
    }
});

export const {removeError} = errorsSlice.actions;

export default errorsSlice.reducer;
