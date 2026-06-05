import axiosClient from "../../axios"

export const retrieveProducts = async () => {
    const {data} = await axiosClient.get(`/products`)
    return data
}