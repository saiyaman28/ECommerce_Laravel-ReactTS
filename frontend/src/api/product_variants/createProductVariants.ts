import axiosClient from '../../axios'
import {type ProductVariants} from '../../exporter/data'

export const createProductVariants = async (data: Pick<ProductVariants, `product_id` | `variant_name` | `price` | `stock` | `image`>) => {
    const formData = new FormData()

    formData.append(`product_id`, String(data.product_id))
    formData.append(`variant_name`, data.variant_name)
    formData.append(`price`, String(data.price))
    formData.append(`stock`, String(data.stock))

    if (data.image instanceof File) {
        formData.append(`image`, data.image)
    }
    
    return axiosClient.post(`/product_variants`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
}