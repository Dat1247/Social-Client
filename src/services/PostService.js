import { BaseService } from "./baseService"

export const PostService = {
    getPosts: () => {
        return BaseService.get(`post`)
    },

    createPost: (newPost) => {
        return BaseService.post(`post/create-post`, newPost)
    },
    
    deletePost: (idPost) => {
        return BaseService.delete(`post/${idPost}`)
    },

    getLikeOfPost: (idPost) => {
        return BaseService.get(`like/get-like/${idPost}`)
    },

    likePost: (idPost) => {
        return BaseService.post(`like/like-post/${idPost}`)
    },
    getPostById: (idPost) => {
        return BaseService.get(`post/get-post-by-id/${idPost}`)
    },

    createComment: (commentObj, idPost) => {
        return BaseService.post(`comment/create/${idPost}`, commentObj)
    },
    deleteComment: (idComment) => {
        return BaseService.delete(`comment/delete-comment/${idComment}`)
    },
    updatePost: (idPost, postObj) => {
        return BaseService.put(`post/update-post/${idPost}`, postObj);
    },
    updateComment: (idComment, commentEdit) => {
        return BaseService.put(`comment/update-comment/${idComment}`, commentEdit);
    },
    changeStatusPost: (idPost, viewModeOfPost) => {
        return BaseService.put(`post/change-status/${idPost}`, viewModeOfPost);
    }
    
}