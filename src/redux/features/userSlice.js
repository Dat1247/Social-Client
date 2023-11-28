'use client'

import { STATUS_CODE, TOKEN, USER_LOGIN } from "@/util/config";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { loginAction, registerAction } from "../actions/userActions";
import { Notification } from "@/components/Notification/Notification";

let user = {};

if (typeof window !== 'undefined') {
    if (localStorage?.getItem(USER_LOGIN)) {
        user = JSON.parse(localStorage.getItem(USER_LOGIN));
    }
  }


export const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        arrUser: [],
        userLogin: user,
        isLogin: false,
        isLoading: false,
        isSignUp: false,
    },
    reducers: {
        toggleIsLoading: (state, action) => {
            state.isLoading = true
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginAction.fulfilled, (state, action) => {
            const {data, status} = action.payload;
            
            if(status === STATUS_CODE.SUCCESS) {
                localStorage.setItem(USER_LOGIN, JSON.stringify(data.userLogin));
                localStorage.setItem(TOKEN, JSON.stringify(data.userLogin.accessToken));
                state.userLogin = data.userLogin;
                state.isLogin = true;
                state.isLoading = false;
                Notification("success", "Login successfully!");
            }
        });
        builder.addCase(loginAction.rejected, (state, action) => {
            state.isLoading = false;
            Notification("error", "Login failed!", action.payload?.response.data);
        });
        builder.addCase(registerAction.fulfilled, (state, action) => {
            const {data, status} = action.payload;


            if(status === STATUS_CODE.SUCCESS || status === STATUS_CODE.CREATED) {
                state.isSignUp = true;
                state.isLoading = false;
                Notification("success", "Sign up new account successfully!")
            }
        });
        builder.addCase(registerAction.rejected, (state, action) => {
            state.isLoading = false;
            Notification("error", "Register failed!", action.payload?.response.data);
        })
    }
})

export const {
    toggleIsLoading
} = userSlice.actions;

export default userSlice.reducer;