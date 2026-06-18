import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {type Categories} from '../../exporter/data'
import {createCategories} from '../../exporter/api'

export default function useCreateCategory() {
    const [categoryName, setCategoryName] = useState<Categories[`category_name`]>(``)

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        setLoading(true)
        setError(null)

        if (!categoryName) return

        try {
            await createCategories(categoryName)
            alert(`Category created`)
            navigate(`/admin/list/categories`)
        } 
        catch (err: any) {
            console.log(err.response?.data?.message)
            setError(`Failed to create category`)
        }
        setLoading(false)
    }

    return {
        categoryName,
        setCategoryName,
        error,
        loading,
        handleSubmit,
    }
}