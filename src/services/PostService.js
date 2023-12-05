import { BaseService } from "./baseService"

export const PostService = {
    getPosts: () => {
        return BaseService.get(`post`)
    }
}