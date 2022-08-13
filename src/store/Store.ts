import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from "./reducer/AuthSlice";
import {authApi} from "./api/AuthApi";
import {eventApi} from "./api/EventApi";
import {userApi} from "./api/UserApi";

const rootReducer = combineReducers({
    authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
            authApi.middleware, eventApi.middleware, userApi.middleware,
        )
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
