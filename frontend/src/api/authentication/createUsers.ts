import axiosClient from "../../axios"
import {type Users} from "../../exporter/data"

export const createUsers = async (data: Pick<Users, "first_name" | "last_name" | "email" | "contact" | "password" | "password_confirmation">) => {
    const {data: res} = await axiosClient.post(`/register`, data)
    return res.user, res.token
}