import { BaseService } from "./baseService"

export const PostService = {
    getPosts: () => {
        return BaseService.get(`post`)
    },

    createPost: (newPost) => {
        return BaseService.post(`post/create-post`, newPost)
    }
}