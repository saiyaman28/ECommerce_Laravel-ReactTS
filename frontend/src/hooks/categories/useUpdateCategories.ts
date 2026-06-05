import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {type Categories} from '../../exporter/data'
import {fetchCategories, updateCategories} from '../../exporter/api'

export default function useUpdateCategory() {
    const [categoryName, setCategoryName] = useState<Pick<Categories, `category_name`>>({category_name: ``})

    const {id} = useParams()

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (!id) return
        const load = async () => {
            const res = await fetchCategories(id)
            setCategoryName({category_name: res.data.category_name,})
        }
        load()
    }, [id])

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        setLoading(true)
        setError(null)

        if (!id) return

        try {
            await updateCategories(id, {category_name: categoryName.category_name})
            alert(`Category updated`)
            navigate(`/admin/list/categories`)
        }
        catch (err: any) {
            console.log(err.response?.data?.message)
            setError(`Failed to update category`)
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