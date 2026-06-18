import axiosClient from '../../axios'

export const fetchOrders = async (id: string) => {
    const res = await axiosClient.get(`/orders/${id}`)
    return res
}