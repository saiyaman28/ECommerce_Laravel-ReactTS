import {useState} from 'react'
import {useStateContext} from '../../context_provider'
import {type Users} from '../../exporter/data'
import {tokenUsers} from '../../exporter/api'

export default function useLogin() {
    const {setUser, saveToken} = useStateContext()
    const [form, setForm] = useState<Pick<Users, `email` | `password`>>({
        email: ``,
        password: ``,
    })
    
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            const res = await tokenUsers(form)
            setUser(res.user)
            saveToken(res.token)
        } 
        catch (err: any) {
            if (err?.response?.status === 401){
                setError(`Incorrect Email or Password.`)
                console.log(err.response?.data?.message)
            }
            if (err?.response?.status === 422){
                setError(`Validation error.`)
                console.log(err.response?.data?.message)
            }
            if (err?.response?.status >= 422){
                setError(`Server error. Please try again later.`)
                console.log(err.response?.data?.message)
            }
        }
        setLoading(false)
    }

    return {
        form,
        setForm,
        error,
        loading,
        handleSubmit,
    }
}