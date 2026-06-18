import axiosClient from '../../axios'
import {type Categories} from '../../exporter/data'

export const createCategories = async (data: Categories[`category_name`]) => {
    const {data: res} = await axiosClient.post(`/categories`, {category_name: data})
    return res
}