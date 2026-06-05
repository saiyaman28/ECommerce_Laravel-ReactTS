import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {type Products, type ProductVariants} from '../../exporter/data'
import {retrieveProducts, fetchProductVariants, deleteProductVariants} from '../../exporter/api'

export default function useDeleteProducts() {
    const [form, setForm] = useState<Pick<ProductVariants, `product_id` | `variant_name` | `price` | `stock`>>({ 
        product_id: 0,
        variant_name: ``,
        price: ``,
        stock: ``,
    })

    const [existingImage, setExistingImage] = useState<Pick<Products, `image`>>()

    const [products, setProducts] = useState<Pick<Products, `id` | `product_name`>[]>([])

    const {id} = useParams()

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (!id) return
        const load = async () => {
            setProducts(await retrieveProducts())
            const res = await fetchProductVariants(id)
            setForm({            
                product_id: res.data.product_id,
                variant_name: res.data.variant_name,
                price: res.data.price,
                stock: res.data.stock
            })
            setExistingImage(res.data.image)
        }
        load()
    }, [id])

    const filteredSelection = (products.map((p) => ({
        Value: p.id,
        Title: p.product_name
    })))

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        setLoading(true)
        setError(null)

        if (!id) return;

        try {
            await deleteProductVariants(id)
            alert(`Product Variant deleted`)
            navigate(`/admin/list/products/variants`)
        } 
        catch (err: any) {
            console.log(err.response?.data?.message)
            setError(`Failed to delete product variant`)
        }
        setLoading(false)
    }

    return {
        form,
        setForm,
        existingImage,
        setExistingImage,
        products,
        setProducts,
        error,
        loading,
        filteredSelection,
        handleSubmit,
    }
}