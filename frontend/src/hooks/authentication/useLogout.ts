import {useState} from 'react'
import {useStateContext} from '../../context_provider'
import {logoutUsers} from '../../exporter/api'

export default function useLogout() {
    const {setUser, saveToken} = useStateContext()
    
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const destroyToken = async (e: any) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            await logoutUsers()
            setUser(null)
            saveToken(null)
            localStorage.removeItem(`cart`)
        } 
        catch (err: any) {
            console.log(err)
        }
        setLoading(false)
    }

    return {
        destroyToken,
        error,
        loading,
    }
}