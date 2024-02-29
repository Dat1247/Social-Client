import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import userSlice from '../features/userSlice';
import postSlice from '../features/postSlice';

export const store = configureStore({
    reducer: {
        userSlice,
        postSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector