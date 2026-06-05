import axiosClient from "../../axios"

export const fetchProducts = async (id: string) => {
    return axiosClient.get(`/products/${id}`)
}