import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    arrPost: [],
    isShowPostModal: false,
    isShowInputPostModal: false,
    isShowChangeStatusPostModal: false,
    isEditComment: false,
    idEditComment: undefined,
    postIdOfModal: undefined,
    postIdEdit: undefined,
    idChangeStatusPostModal: undefined,
    currentStatusPost: "",
    postDetailById: {},
    postEdit: {},
    arrComment: []
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
        openChangeStatusPostModal: (state, action) => {
            state.isShowChangeStatusPostModal = true
        },
        closeChangeStatusPostModal: (state, action) => {
            state.isShowChangeStatusPostModal = false
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
        },
        setIsEditComment: (state, action) => {
            state.isEditComment = action.payload
        },
        setIdEditComment: (state, action) => {
            state.idEditComment = action.payload
        },
        setIdChangeStatusPost: (state, action) => {
            state.idChangeStatusPostModal = action.payload
        },
        setCurrentStatusPost: (state, action) => {
            state.currentStatusPost = action.payload
        }
    }

})

export const {
    getArrPosts, openPostModal, closePostModal, setPostIdOfModal, setPostDetailById, openInputPostModal, closeInputPostModal, setPostIdEdit, setPostEdit, setIsEditComment, setIdEditComment, openChangeStatusPostModal, closeChangeStatusPostModal, setIdChangeStatusPost, setCurrentStatusPost
} = postSlice.actions;
export default postSlice.reducer;