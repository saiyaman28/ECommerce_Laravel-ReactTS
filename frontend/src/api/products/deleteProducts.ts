import axiosClient from '../../axios'

export const deleteProducts = async (id: string) => {
    return axiosClient.delete(`/products/${id}`)
}