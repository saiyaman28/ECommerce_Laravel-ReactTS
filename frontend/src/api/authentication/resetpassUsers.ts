import axiosClient from "../../axios"
import {type Users} from "../../exporter/data"

export const resetpassUsers = async (data: Pick<Users, `token` | `email` | `password` | `password_confirmation`>) => {
    const {data: res} = await axiosClient.post(`/reset-password`, data)
    return res
}