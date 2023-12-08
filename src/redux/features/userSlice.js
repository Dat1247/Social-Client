
import { createSlice } from "@reduxjs/toolkit";

let ULogin = {};

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

        }
    }
});

export const {
    setUserLogin
} = userSlice.actions;

export default userSlice.reducer;