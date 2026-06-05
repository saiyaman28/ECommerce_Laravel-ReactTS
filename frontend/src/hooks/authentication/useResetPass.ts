import {useState} from 'react'
import {useSearchParams, useNavigate} from 'react-router-dom'
import {resetpassUsers} from "../../exporter/api"
import {type Users} from "../../exporter/data"

export default function useResetPass() {
    const [form, setForm] = useState<Pick<Users, "password" | "password_confirmation">>({
        password: ``,
        password_confirmation: ``,
    })
    const [params] = useSearchParams()
    const email = params.get(`email`) || ``
    const token = params.get(`token`) || ``
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setError(null)
        setLoading(true)        
        if (form.password !== form.password_confirmation) {
            setError(`Passwords do not match`)
            setLoading(false)
            return
        }
        try {
            await resetpassUsers({email, token, password: form.password, password_confirmation: form.password_confirmation})
            alert(`Password reset successful!`)
            navigate("/")
        } 
        catch (err: any) {
            setError(`Validation error.`)
            console.log(err.response?.data?.message)
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