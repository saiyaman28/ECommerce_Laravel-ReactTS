import axiosClient from '../../axios'
import {type Categories} from '../../exporter/data'

export const updateCategories = async (id: string, data: Categories[`category_name`] ) => {
    const {data: res} = await axiosClient.put(`/categories/${id}`, {category_name: data})
    return res
}