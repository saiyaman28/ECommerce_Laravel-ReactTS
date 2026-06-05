import axiosClient from "../../axios"
import {type ProductVariants} from "../../exporter/data"

export const updateProductVariants = async (id: string, data: Pick<ProductVariants, `product_id` | `variant_name` | `price` | `stock` | `image`>) => {
    const formData = new FormData()

    formData.append("product_id", String(data.product_id))
    formData.append("variant_name", data.variant_name)
    formData.append("price", String(data.price))
    formData.append("stock", String(data.stock))

    if (data.image instanceof File) {
        formData.append("image", data.image)
    }
    
    formData.append("_method", "PUT")

    return axiosClient.post(`/product_variants/${id}`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
}