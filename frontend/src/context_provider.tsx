import { createContext, useContext, useEffect, useState } from "react"
import axiosClient from "./axios"

interface User {
    id: number
    first_name: string
    last_name: string
    email: string
    contact: string
    role: `admin` | `customer`
}

interface ContextType {
    user: User | null
    token: string | null
    loading: boolean

    login: (data: {email: string; password: string}) => Promise<void>
    logout: () => Promise<void>

    register: (data: any) => Promise<void>

    forgotPassword: (data: {email: string}) => Promise<string>
    resetPassword: (data: {email: string; token: string; password: string; password_confirmation: string;}) => Promise<string>

    updateProfile: (data: {first_name: string; last_name: string; email: string; contact?: string}) => Promise<void>
    changePassword: (data: {current_password: string; password: string; password_confirmation: string;}) => Promise<string>
}


const StateContext = createContext<ContextType | undefined>(undefined)

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(localStorage.getItem(`ACCESS_TOKEN`))
    const [loading, setLoading] = useState(true)

    const saveToken = (token: string | null) => {
        setToken(token)
        if (token) {
            localStorage.setItem(`ACCESS_TOKEN`, token)
        } 
        else {
            localStorage.removeItem(`ACCESS_TOKEN`)
        }
    }

    const login = async (data: { email: string; password: string }) => {
        const res = await axiosClient.post(`/login`, data)
        setUser(res.data.user)
        saveToken(res.data.token)
    }

    const logout = async () => {
        await axiosClient.post(`/logout`)
        setUser(null)
        saveToken(null)
    }

    const register = async (data: any) => {
        const res = await axiosClient.post(`/register`, data)
        setUser(res.data.user)
        saveToken(res.data.token)
    }

    const forgotPassword = async (email: string) => {
        const res = await axiosClient.post(`/forgot-password`, { email })
        return res.data.message
    }

    const resetPassword = async (data: {email: string; token: string; password: string; password_confirmation: string}) => {
        const res = await axiosClient.post(`/reset-password`, data)
        return res.data.message
    }

    const updateProfile = async (data: {first_name: string; last_name: string; email: string; contact?: string}) => {
        const res = await axiosClient.put(`/profile`, data)
        setUser(res.data.user)
    }

    const changePassword = async (data: {current_password: string; password: string; password_confirmation: string;}) => {
        const res = await axiosClient.put(`/change-password`, data)
        if (res.data.token) {
            saveToken(res.data.token)
        }
        return res.data.message
    }

    useEffect(() => {
        if (!token) {
            setLoading(false)
            return
        }
        axiosClient.get(`/user`).then(res => setUser(res.data))
            .catch(() => {
                setUser(null)
                saveToken(null)
            }).finally(() => setLoading(false))
    }, [token])

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                logout,
                register,
                forgotPassword,
                resetPassword,
                updateProfile,
                changePassword,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => {
    const context = useContext(StateContext)
    if (!context) {
        throw new Error(`useStateContext must be used inside ContextProvider`)
    }
    return context
}
