import { createSlice } from "@reduxjs/toolkit";
import arrPosts from '../../posts.json';

export const postSlice = createSlice({
    name: 'postSlice',
    initialState: {
        arrPost: arrPosts
    },
    reducers: {
        getArrayPost: (state, action) => {
            state.arrPost = action.payload
        }
    }
})

export const {getArrayPost} = postSlice.actions;

export default postSlice.reducer