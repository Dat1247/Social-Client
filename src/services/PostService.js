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
    }
    
}