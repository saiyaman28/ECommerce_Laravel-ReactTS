import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {type Users} from '../../exporter/data'
import {createUsers} from '../../exporter/api'

export default function useRegister() {
    const [form, setForm] = useState<Pick<Users, `first_name` | `last_name` | `email` | `contact` | `password` | `password_confirmation`>>({
        first_name: ``,
        last_name: ``,
        email: ``,
        contact: ``,
        password: ``,
        password_confirmation: ``
    })
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
            await createUsers(form)
            alert(`Registation successful!`)
            navigate(`/`)
        } 
        catch (err: any) {
            setError(`Validation error.`)
            console.log(
                err.response?.data?.message ||
                err.response?.data?.errors?.email?.[0] ||
                err.response?.data?.errors?.password?.[0]
            )
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