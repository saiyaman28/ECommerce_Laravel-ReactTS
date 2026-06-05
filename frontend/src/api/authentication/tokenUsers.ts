import axiosClient from "../../axios"
import {type Users} from "../../exporter/data"

export const tokenUsers = async (data: Pick<Users, "email" | "password">) => {
    const {data: res} = await axiosClient.post("/login", data)
    return res
}
