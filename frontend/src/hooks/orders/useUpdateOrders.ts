import {useState, useEffect} from 'react'
import {useStateContext} from '../../context_provider'
import Tesseract from 'tesseract.js'
import {useNavigate, useParams} from 'react-router-dom'
import {type Users, type Products, type ProductVariants, type Orders, type OrderItems} from '../../exporter/data'
import {retrieveUsers, retrieveProducts, retrieveProductVariants, fetchOrders, retrieveOrderItems, updateOrders} from '../../exporter/api'

export default function useUpdateOrders() {
    const {user} = useStateContext()

    const [form, setForm] = useState<Pick<Orders, `customer_id` | `total_price` | `payment_reference_number` | `status`>>({ 
        customer_id: 0,
        total_price: 0,
        payment_reference_number: ``,
        status: `Pending`,
    })

    const [buyer, setBuyer] = useState<Pick<Users, `id` | `first_name` | `last_name` | `email` | `contact`>[]>([])
    const [products, setProducts] = useState<Pick<Products, `id` | `product_name`>[]>([])
    const [variants, setVariants] = useState<Pick<ProductVariants, `id` | `product_id` | `variant_name`>[]>([])
    const [orderitems, setOrderItems] = useState<Pick<OrderItems, `id` | `order_id` | `product_variant_id` | `quantity` | `total_price`>[]>([])

    const {id} = useParams()

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (!id) return
        const load = async () => {
            setBuyer(await retrieveUsers())
            setProducts(await retrieveProducts())
            setVariants(await retrieveProductVariants())
            setOrderItems(await retrieveOrderItems())
            const res = await fetchOrders(id)
            setForm({            
                customer_id: res.data.customer_id,
                total_price: res.data.total_price,
                payment_reference_number: res.data.payment_reference_number,
                status: res.data.status,
            })
        }
        load()
    }, [id])

    const filteredCustomer = buyer.find((b) => b.id === Number(form.customer_id))

    const filteredItems = orderitems.filter((i) => i.order_id === Number(id)).map((i) => {
        const variant = variants.find((v) => v.id === i.product_variant_id)
        const product = products.find((p) => p.id === variant?.product_id)

        return {
            ...i,
            product_name: product?.product_name,
            variant_name: variant?.variant_name
        }
    })

    const filteredSelection = [
        { Title: `Pending`, Value: `Pending` },
        { Title: `Processing`, Value: `Processing` },
        { Title: `Shipped`, Value: `Shipped` },
        { Title: `Delivered`, Value: `Delivered` },
        { Title: `Canceled`, Value: `Canceled` },
    ]
    
    const handleReceiptUpload = async (file: File) => {
        try {
            const {data: {text} } = await Tesseract.recognize(file, 'eng')
            const normalized = text.replace(/\n/g, " ").replace(/\s+/g, " ").trim()
            let refMatch = normalized.match(/Reference\s*(?:No\.?|Number)?[\s:\-]*([0-9]{8,})/i)

            if (!refMatch) refMatch = normalized.match(/\b\d{8,}\b/)
            
            if (refMatch) {
                setForm((prev) => ({
                    ...prev,
                    payment_reference_number: refMatch?.[1] || refMatch?.[0] || ''
                }))
            }
            else alert("Reference number not found")
            
        }
        catch (err) {
            alert("Failed to scan receipt")
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        if (!id) {
            setLoading(false)
            return
        }
        try {
            await updateOrders(id, {
                payment_reference_number: form.payment_reference_number,
                status: form.status,
            })
            alert(`Order updated`)
            if (user?.role === `customer`) navigate(`/customer/list/orders`)
            if (user?.role === `admin`) navigate(`/admin/list/orders`)
            
        }
        catch (err: any) {
            console.log(err.response?.data?.message)
            setError(`Failed to update order`)
        }
        setLoading(false)
    }

    return {
        form,
        setForm,
        buyer,
        setBuyer,
        products,
        setProducts,
        variants,
        setVariants,
        orderitems,
        setOrderItems,
        error,
        loading,
        filteredCustomer,
        filteredItems,
        filteredSelection,
        handleSubmit,
        handleReceiptUpload
    }
}