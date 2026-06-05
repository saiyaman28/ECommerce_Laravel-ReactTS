import axiosClient from "../../axios"
import {type Users} from "../../exporter/data"

export const forgotpassUsers = async (data: Pick<Users, `email`>) => {
    const {data: res} = await axiosClient.post(`/forgot-password`, data)
    return res
}