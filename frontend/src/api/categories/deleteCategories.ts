import axiosClient from '../../axios'

export const deleteCategories = async (id: string) => {
    return axiosClient.delete(`/categories/${id}`)
}