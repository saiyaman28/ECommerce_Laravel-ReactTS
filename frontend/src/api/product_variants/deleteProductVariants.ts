import axiosClient from "../../axios"

export const deleteProductVariants = async (id: string) => {
    return axiosClient.delete(`/product_variants/${id}`)
}