import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    arrPost: [],
    isShowPostModal: false,
    isShowInputPostModal: false,
    postIdOfModal: undefined,
    postDetailById: {}
}

export const postSlice = createSlice({
    name: 'post',
    initialState: initialState,
    reducers: {
        getArrPosts: (state, action) => {
            state.arrPost = action.payload
        },
        openPostModal: (state, action) => {
            state.isShowPostModal = true
        },
        closePostModal: (state, action) => {
            state.isShowPostModal = false
        },
        openInputPostModal: (state, action) => {
            state.isShowInputPostModal = true
        },
        closeInputPostModal: (state, action) => {
            state.isShowInputPostModal = false
        },
        setPostIdOfModal: (state, action) => {
            state.postIdOfModal = action.payload
        },
        setPostDetailById: (state, action) => {
            state.postDetailById = action.payload
        }
    }

})

export const {
    getArrPosts, openPostModal, closePostModal, setPostIdOfModal, setPostDetailById, openInputPostModal, closeInputPostModal
} = postSlice.actions;
export default postSlice.reducer;