import axiosClient from "../../axios"

export const logoutUsers = async () => {
    const res = await axiosClient.post("/logout")
    return res
}