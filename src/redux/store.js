'use client'

import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import routerReducer from "./features/routerSlice";
import userReducer from "./features/userSlice";
import postReducer from "./features/postSlice"

export const store = configureStore({
    reducer: {
        routerReducer,
        userReducer,
        postReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
    devTools: process.env.NODE_ENV !== "production"
})