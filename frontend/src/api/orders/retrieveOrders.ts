import axiosClient from '../../axios'

export const retrieveOrders = async () => {
    const {data} = await axiosClient.get(`/orders`)
    return data
}