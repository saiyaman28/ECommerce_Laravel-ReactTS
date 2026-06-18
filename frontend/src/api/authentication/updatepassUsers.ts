import axiosClient from '../../axios'
import {type Users} from '../../exporter/data'

export const updatepassUsers = async (data: Pick<Users, `current_password` | `password` | `password_confirmation`>) => {
    const {data: res} = await axiosClient.put(`/change-password`, data)
    return res
}