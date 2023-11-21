'use client'

import { STATUS_CODE, TOKEN, USER_LOGIN } from "@/util/config";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { loginAction, registerAction } from "../actions/userActions";

let user = {};

// if (localStorage.getItem(USER_LOGIN)) {
// 	user = JSON.parse(localStorage.getItem(USER_LOGIN));
// }

export const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        arrUser: [],
        userLogin: user,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(loginAction.fulfilled, (state, action) => {
            const {data, status} = action.payload;
            

            if(status === STATUS_CODE.SUCCESS) {
                console.log({data})
                localStorage.setItem(USER_LOGIN, JSON.stringify(data.userLogin));
                localStorage.setItem(TOKEN, JSON.stringify(data.userLogin.accessToken));
                state.userLogin = data.userLogin;
            }
        });
        builder.addCase(loginAction.rejected, (state, action) => {
            console.log("error", action.payload?.response.data)
        });
        builder.addCase(registerAction.fulfilled, (state, action) => {
            const {data, status} = action.payload;

            if(status === STATUS_CODE.SUCCESS) {
                console.log({data})
                alert("Sign up new account successfully!")
            }
        });
        builder.addCase(registerAction.rejected, (state, action) => {
            alert(action.payload?.response.data)
        })
    }
})

export const {

} = userSlice.actions;

export default userSlice.reducer;