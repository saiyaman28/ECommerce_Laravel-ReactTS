import {createContext, useContext, useEffect, useState} from 'react'
import axiosClient from './axios'

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

    setUser: React.Dispatch<React.SetStateAction<User | null>>
    saveToken: (token: string | null) => void
}

const StateContext = createContext<ContextType | undefined>(undefined)

export const ContextProvider = ({children}: {children: React.ReactNode}) => {
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

    useEffect(() => {
        if (!token) {
            setUser(null)
            setLoading(false)
            return
        }

        axiosClient.get(`/user`).then((res) => setUser(res.data)).catch(() => {
            setUser(null)
            saveToken(null)
        }).finally(() => setLoading(false))
    }, [token])

    return (
        <StateContext.Provider value={{user, token, loading, setUser, saveToken}} >
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