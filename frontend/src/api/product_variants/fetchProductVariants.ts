import axiosClient from '../../axios'

export const fetchProductVariants = async (id: string) => {
    return axiosClient.get(`/product_variants/${id}`)
}