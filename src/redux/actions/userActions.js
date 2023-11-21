'use client'

import { UserService } from "@/services/UserService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginAction = createAsyncThunk("userSlice/loginAction", async (user, {getState, rejectWithValue}) => {
    try {
        const result = await UserService.login(user);
        const {data, status} = result;

        return {data, status}
    } catch (err) {
        return rejectWithValue(err);
    }
})

export const registerAction = createAsyncThunk("userSlice/registerAction", async (user, {rejectWithValue}) => {
    try {
        const result = await UserService.register(user);
        const {data, status} = result;

        return {data, status}
    } catch (err) {
        return rejectWithValue(err);
    }
})