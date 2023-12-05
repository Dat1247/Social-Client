import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    arrPost: [],
}

export const postSlice = createSlice({
    name: 'post',
    initialState: initialState,
    reducers: {
        getArrPosts: (state, action) => {
            state.arrPost = action.payload
        }
    }

})

export const {
    getArrPosts
} = postSlice.actions;
export default postSlice.reducer;