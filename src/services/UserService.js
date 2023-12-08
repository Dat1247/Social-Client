import { BaseService } from "./baseService"

export const UserService = {
    login: (user) => {
        return BaseService.post(`user/login`, user)
    },
    register: (user) => {
        return BaseService.post(`user/register`, user)
    },
    getUserProfile: (id) => {
        return BaseService.get(`user/get-user-detail-by-id/${id}`)
    }
}