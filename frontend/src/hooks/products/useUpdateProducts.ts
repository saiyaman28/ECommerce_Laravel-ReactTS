import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {type Products, type Categories} from '../../exporter/data'
import {retrieveCategories, fetchProducts, updateProducts} from '../../exporter/api'

export default function useUpdateProducts() {
    const [form, setForm] = useState<Pick<Products, `product_name` | `category_id` | `description` | `image`>>({ 
        product_name: ``,
        category_id: 0,
        description: ``,
        image: null,
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
                image: null
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
        console.log(`Submitting form:`, form)
        setLoading(true)
        setError(null)

        if (!id) return;

        try {
            await updateProducts(id, {
                product_name: form.product_name,
                category_id: Number(form.category_id),
                description: form.description,
                image: form.image
            })
            alert(`Product updated`)
            navigate(`/admin/list/products`)
        }
        catch (err: any) {
            console.log(err.response?.data?.message)
            setError(`Failed to update product`)
        }
        setLoading(false)
    }

    return {
        form,
        setForm,
        categories,
        setCategories,
        existingImage,
        setExistingImage,
        error,
        loading,
        filteredSelection,
        handleSubmit,
    }
}