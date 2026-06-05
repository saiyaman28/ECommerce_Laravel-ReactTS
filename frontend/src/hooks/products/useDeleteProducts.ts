import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {type Products, type Categories} from '../../exporter/data'
import {retrieveCategories, fetchProducts, deleteProducts} from '../../exporter/api'

export default function useDeleteProducts() {
    const [form, setForm] = useState<Pick<Products, `product_name` | `category_id` | `description`>>({ 
        product_name: ``,
        category_id: 0,
        description: ``,
    })

    const [existingImage, setExistingImage] = useState<Pick<Products, `image`>>()
    
    const [categories, setCategories] = useState<Pick<Categories, `id` | `category_name`>[]>([])

    const {id} = useParams()

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (!id) return
        const load = async () => {
            setCategories(await retrieveCategories())
            const res = await fetchProducts(id)
            setForm({            
                product_name: res.data.product_name,
                category_id: res.data.category_id,
                description: res.data.description,
            })
            setExistingImage(res.data.image)
        }
        load()
    }, [id])

    const filteredSelection = (categories.map((c) => ({
        Value: c.id,
        Title: c.category_name
    })))

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        setLoading(true)
        setError(null)

        if (!id) return;

        try {
            await deleteProducts(id)
            alert(`Product deleted`)
            navigate(`/admin/list/products`)
        }
        catch (err: any) {
            console.log(err.response?.data?.message)
            setError(`Failed to delete product`)
        }
        setLoading(false)
    }

    return {
        form,
        setForm,
        existingImage,
        setExistingImage,
        categories,
        setCategories,
        error,
        loading,
        filteredSelection,
        handleSubmit,
    }
}