import {useState} from 'react'
import {type Users} from '../../exporter/data'
import {forgotpassUsers} from '../../exporter/api'

export default function useForgotPass() {
    const [email, setEmail] = useState<Pick<Users, `email`>>({email: ``})
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            await forgotpassUsers(email)
            alert(`Password reset link has been sent.`)
        } 
        catch (err: any) {
            setError(`Validation error.`)
            console.log(err.response?.data?.message)
        }
        setLoading(false)
    }

    return {
        email,
        setEmail,
        error,
        loading,
        handleSubmit,
    }
}