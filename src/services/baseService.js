'use client'

import { API_URL, TOKEN } from "@/util/config";
import  Axios from "axios";

class baseService {
    put = (url, model) => {
        return Axios({
            url: `${API_URL}/${url}`,
            method: 'PUT',
            data: model,
            headers: {
                Authorization: "Bearer " + localStorage.getItem(TOKEN)?.replaceAll('"', ""),
            }
        })
    }
    get = (url) => {
        return Axios({
            url: `${API_URL}/${url}`,
            method: 'GET',
            headers: {
                Authorization: "Bearer " + localStorage.getItem(TOKEN)?.replaceAll('"', ""),
            }
        })
    }
    post = (url, model) => {
        return Axios({
            url: `${API_URL}/${url}`,
            method: 'POST',
            data: model,
            headers: {
                Authorization: "Bearer " + localStorage.getItem(TOKEN)?.replaceAll('"', ""),
            }
        })
    }
    delete = (url) => {
        return Axios({
            url: `${API_URL}/${url}`,
            method: 'DELETE',
            headers: {
                Authorization: "Bearer " + localStorage.getItem(TOKEN)?.replaceAll('"', ""),
            }
        })
    }
}

export const BaseService = new baseService();