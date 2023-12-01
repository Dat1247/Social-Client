import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import userSlice from './features/userSlice'

export const store = configureStore({
    reducer: {
        userSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector