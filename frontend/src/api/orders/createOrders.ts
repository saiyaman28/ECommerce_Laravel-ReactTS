import axiosClient from "../../axios"
import {type Orders, type OrderItems} from "../../exporter/data"

export const createOrders = async (data: {customer_id: Orders["customer_id"], items: Pick<OrderItems, `product_variant_id` | `quantity`>[]}) => {
    const {data: res} = await axiosClient.post("/orders", data)
    return res
}