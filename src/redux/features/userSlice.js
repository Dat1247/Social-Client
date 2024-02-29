
import { createSlice } from "@reduxjs/toolkit";

let ULogin = {};

const initialState = {
    arrUser: [],
    userLogin: ULogin,
    userObj: {},
    listFriends: [],
    listFriendRequests: [],
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: initialState,
    reducers: {
        setUserLogin: (state, action) => {
            state.userLogin = action.payload;
        },
        setUserObj: (state, action) => {
            state.userObj = action.payload;
        },
        setListFriends: (state, action) => {
            state.listFriends = action.payload;
        },
        setListFriendRequests: (state, action) => {
            state.listFriendRequests = action.payload
        }
    }
});

export const {
    setUserLogin,
    setUserObj,
    setListFriends,
    setListFriendRequests
} = userSlice.actions;

export default userSlice.reducer;