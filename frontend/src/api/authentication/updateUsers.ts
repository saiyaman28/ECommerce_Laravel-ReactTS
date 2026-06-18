import axiosClient from '../../axios'
import {type Users} from '../../exporter/data'

export const updateUsers = async (data: Pick<Users, `first_name` | `last_name` | `email` | `contact`>) => {
    const {data: res} = await axiosClient.put(`/profile`, data)
    return res.user, res.token
}