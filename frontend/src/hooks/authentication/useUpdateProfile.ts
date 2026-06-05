import {useState, useEffect} from 'react'
import {useStateContext} from '../../context_provider'
import {type Users} from '../../exporter/data'
import {updateUsers} from '../../exporter/api'

export default function useUpdateProfile() {
    const {user} = useStateContext()

    const [form, setForm] = useState<Pick<Users, `first_name` | `last_name` | `email` | `contact`>>({
        first_name: ``,
        last_name: ``,
        email: ``,
        contact: ``,
    })

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!user) return
        setForm(({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            contact: (user as any)?.contact || ``,
        }))
    }, [user])

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        setLoading(true)
        setError(null)

        try {
            await updateUsers(form)
            alert(`Profile updated successfully`)
        } 
        catch (err: any) {
            setError(err?.response?.data?.message ?? `Update failed`)
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