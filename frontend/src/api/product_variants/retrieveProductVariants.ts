import axiosClient from "../../axios"

export const retrieveProductVariants = async () => {
    const {data} = await axiosClient.get(`/product_variants`)
    return data
}