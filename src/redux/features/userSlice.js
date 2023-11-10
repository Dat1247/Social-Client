import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        arrUser: [],
        user: null,
    },
    reducers: {

    }
})

export const {

} = userSlice.actions;

export default userSlice.reducer;