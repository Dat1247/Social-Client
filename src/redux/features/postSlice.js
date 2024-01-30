import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    arrPost: [],
    isShowPostModal: false,
    isShowInputPostModal: false,
    postIdOfModal: undefined,
    postIdEdit: undefined,
    postDetailById: {},
    postEdit: {}
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
        setPostIdEdit: (state, action) => {
            state.postIdEdit = action.payload
        },
        setPostDetailById: (state, action) => {
            state.postDetailById = action.payload
        },
        setPostEdit: (state, action) => {
            state.postEdit = action.payload
        }
    }

})

export const {
    getArrPosts, openPostModal, closePostModal, setPostIdOfModal, setPostDetailById, openInputPostModal, closeInputPostModal, setPostIdEdit, setPostEdit
} = postSlice.actions;
export default postSlice.reducer;