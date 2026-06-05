import axiosClient from "../../axios"

export const retrieveUsers = async () => {
    const {data} = await axiosClient.get(`/users`)
    return data
}