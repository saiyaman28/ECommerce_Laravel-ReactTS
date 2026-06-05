import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {type Products, type Categories} from '../../exporter/data'
import {retrieveCategories, createProducts} from '../../exporter/api'

export default function useCreateProducts() {
    const [form, setForm] = useState<Pick<Products, `product_name` | `category_id` | `description` | `image`>>({ 
        product_name: ``,
        category_id: 0,
        description: ``,
        image: null,
    })

    const [categories, setCategories] = useState<Categories[]>([])

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    useEffect(() => {
        const load = async () => {
            setCategories(await retrieveCategories())
        }
        load()
    }, [])

    const filteredSelection = (categories.map((c) => ({
        Value: c.id,
        Title: c.category_name
    })))

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        setLoading(true)
        setError(null)

        if (!form.product_name || !form.category_id) return

        try {
            await createProducts(form)
            alert(`Product created`)
            navigate(`/admin/list/products`)
        } 
        catch (err: any) {
            console.log(err.response?.data?.message)
            setError(`Failed to create product`)
        }
        setLoading(false)
    }

    return {
        form,
        setForm,
        categories,
        setCategories,
        error,
        loading,
        filteredSelection,
        handleSubmit,
    }
}