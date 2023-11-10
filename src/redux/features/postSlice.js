import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name: 'postSlice',
    initialState: {
        arrPost: []
    },
    reducers: {
        getArrayPost: (state, action) => {
            state.arrPost = action.payload
        }
    }
})

export const {getArrayPost} = postSlice.actions;

export default postSlice.reducer