import axiosClient from "../../axios"

export const retrieveOrderItems = async () => {
    const {data} = await axiosClient.get(`/order_items`)
    return data
}