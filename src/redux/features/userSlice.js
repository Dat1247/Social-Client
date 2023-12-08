
import { USER_LOGIN } from "@/util/config";
import { createSlice } from "@reduxjs/toolkit";
import { cookies } from "next/headers";

let ULogin = {};

try {
    ULogin = JSON.parse(window.localStorage.getItem(USER_LOGIN)) || {}
} catch(err) {
    console.error(err);
}

const initialState = {
    arrUser: [],
    userLogin: ULogin
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: initialState,
    reducers: {
        setUserLogin: (state, action) => {
            state.userLogin = action.payload;
            cookies().set(USER_LOGIN, JSON.stringify(data?.userLogin));

        }
    }
});

export const {
    setUserLogin
} = userSlice.actions;

export default userSlice.reducer;