import { BaseService } from "./baseService"

export const UserService = {
    login: (user) => {
        return BaseService.post(`user/login`, user)
    },
    register: (user) => {
        return BaseService.post(`user/register`, user)
    },
    getUserProfile: () => {
        return BaseService.get(`user/get-profile`)
    },
    getUserFriends: (userId) => {
        return BaseService.get(`friend/get-list-friend/${userId}`)
    },
    getFriendRequests: (userId) => {
        return BaseService.get(`friend/get-friend-request-by-user-id/${userId}`);
    }
}