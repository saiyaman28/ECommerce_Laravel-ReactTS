import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {type Products, type ProductVariants} from '../../exporter/data'
import {retrieveProducts, createProductVariants} from '../../exporter/api'

export default function useCreateProductVariants() {
    const [form, setForm] = useState<Pick<ProductVariants, `product_id` | `variant_name` | `price` | `stock` | `image`>>({ 
        product_id: 0,
        variant_name: ``,
        price: ``,
        stock: ``,
        image: null,
    })

    const [products, setProducts] = useState<Pick<Products, `id` | `product_name`>[]>([])

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    useEffect(() => {
        const load = async () => {
            setProducts(await retrieveProducts())
        }
        load()
    }, [])

    const filteredSelection = (products.map((p) => ({
        Value: p.id,
        Title: p.product_name
    })))

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        setLoading(true)
        setError(null)

        if (!form.product_id || !form.variant_name || !form.price || !form.stock) return

        try {
            await createProductVariants(form)
            alert(`Product Variant created`)
            navigate(`/admin/list/products/variants`)
        } 
        catch (err: any) {
            console.log(err.response?.data?.message)
            setError(`Failed to create product variant`)
        }
        setLoading(false)
    }

    return {
        form,
        setForm,
        products,
        setProducts,
        error,
        loading,
        filteredSelection,
        handleSubmit,
    }
}