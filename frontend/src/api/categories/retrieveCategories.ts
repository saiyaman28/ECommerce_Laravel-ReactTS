import axiosClient from '../../axios'

export const retrieveCategories = async () => {
    const {data} = await axiosClient.get(`/categories`)
    return data
}