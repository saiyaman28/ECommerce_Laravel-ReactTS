import axiosClient from "../../axios"

export const fetchCategories = async (id: string) => {
    return axiosClient.get(`/categories/${id}`)
}