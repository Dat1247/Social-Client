import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import postReducer from "./features/postSlice"

export const store = configureStore({
    reducer: {
        userReducer,
        postReducer
    },
    devTools: process.env.NODE_ENV !== "production"
})