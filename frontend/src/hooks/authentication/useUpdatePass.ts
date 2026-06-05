import {useState} from 'react'
import {type Users} from '../../exporter/data'
import {updatepassUsers} from '../../exporter/api'

export default function useUpdatePass() {
    const [form, setForm] = useState<Pick<Users, `current_password` | `password` | `password_confirmation`>>({
        current_password: ``,
        password: ``,
        password_confirmation: ``,
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        setLoading(true)
        setError(null)

        if (form.password !== form.password_confirmation) {
            setError(`Passwords do not match`)
            setLoading(false)
            return
        }

        try {
            await updatepassUsers(form)
            alert(`Password changed successfully!`)
            setForm({
                current_password: ``,
                password: ``,
                password_confirmation: ``,
            })
        } 
        catch (err: any) {
            setError(err.response?.data?.message || `Password change failed`)
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