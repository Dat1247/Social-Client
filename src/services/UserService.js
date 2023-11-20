import { BaseService } from "./baseService"

export const UserService = {
    login: (user) => {
        return BaseService.post(`user/login`, user)
    }
}