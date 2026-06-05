import axiosClient from "../../axios"
import {type Categories} from "../../exporter/data"

export const updateCategories = async (id: string, data: Pick<Categories, "category_name">) => {
    const {data: res} = await axiosClient.put(`/categories/${id}`, data)
    return res
}