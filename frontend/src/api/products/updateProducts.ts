import axiosClient from '../../axios'
import {type Products} from '../../exporter/data'

export const updateProducts = async (id: string, data: Pick<Products, `product_name` | `category_id` | `description` | `image`>) => {
    const formData = new FormData()

    formData.append("product_name", data.product_name || "")
    formData.append("category_id", String(data.category_id))
    formData.append("description", data.description || "")

    if (data.image instanceof File) {
        formData.append("image", data.image)
    }
    
    formData.append("_method", "PUT")

    return axiosClient.post(`/products/${id}`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
}