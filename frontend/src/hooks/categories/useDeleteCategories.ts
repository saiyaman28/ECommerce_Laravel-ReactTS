import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {type Categories} from '../../exporter/data'
import {fetchCategories, deleteCategories} from '../../exporter/api'

export default function useDeleteCategory() {
    const [categoryName, setCategoryName] = useState<Categories[`category_name`]>(``)

    const {id} = useParams()

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (!id) return
        const load = async () => {
            const res = await fetchCategories(id)
            setCategoryName(res.data.category_name)
        }
        load()
    }, [id])

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        setLoading(true)
        setError(null)

        if (!id) return

        try {
            await deleteCategories(id)
            alert(`Category deleted`)
            navigate(`/admin/list/categories`)
        }
        catch (err: any) {
            console.log(err.response?.data?.message)
            setError(`Failed to delete category`)
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