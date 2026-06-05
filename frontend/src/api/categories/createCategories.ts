import axiosClient from "../../axios"
import {type Categories} from "../../exporter/data"

export const createCategories = async (data: Pick<Categories, "category_name">) => {
    const {data: res} = await axiosClient.post("/categories", data)
    return res
}