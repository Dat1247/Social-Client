import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    arrUser: [],
    userLogin: {}
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