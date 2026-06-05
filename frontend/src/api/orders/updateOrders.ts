import axiosClient from "../../axios"
import {type Orders} from "../../exporter/data"

export const updateOrders = async (id: string, data: Pick<Orders, `status`>) => {
    const {data: res} = await axiosClient.put(`/orders/${id}`, data)
    return res
}