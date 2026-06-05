import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {type Products, type ProductVariants} from '../../exporter/data'
import {fetchProductVariants, retrieveProducts} from '../../exporter/api'

export default function useViewProducts() {
    const [products, setProducts] = useState<Pick<Products, `id` | `product_name` | `description`>[]>([])
    const [variants, setVariants] = useState<Pick<ProductVariants, `id` | `product_id` | `variant_name` | `stock` | `price` | `image`> | null>(null)

    const [quantity, setQuantity] = useState<number>(1)

    const {id} = useParams()

    useEffect(() => {
        if (!id) return
        const load = async () => {
            setProducts(await retrieveProducts())
            const res = await fetchProductVariants(id)
            setVariants(res.data)
        }
        load()
    }, [id])

    const product = products.find((p) => Number(p.id) === Number(variants?.product_id))

    const filteredItems = variants && {
        ...variants,
        product_name: product?.product_name,
        description: product?.description,
    }

    const stocks = Number(variants?.stock || 0)

    const handleQuantity = (value: number) => {
        if (value < 1) value = 1
        if (value > stocks) value = stocks

        setQuantity(value)
    }

    const addToCart = () => {
        if (!variants) return

        const cart = JSON.parse(localStorage.getItem(`cart`) || `[]`)

        const existing = cart.find((i: any) => Number(i.product_variant_id) === Number(variants.id))

        const currentQty = existing ? existing.quantity : 0
        const newTotalQty = currentQty + quantity

        if (newTotalQty > stocks) {
            alert(`Cannot add more than stock (${stocks})`)
            return
        }
        if (existing) {
            existing.quantity = newTotalQty
        } 
        else {
            cart.push({
                product_variant_id: Number(variants.id),
                quantity,
            })
        }
        alert(`Added to cart`)
        localStorage.setItem(`cart`, JSON.stringify(cart))
    }

    return {
        products, 
        setProducts,
        variants, 
        setVariants,
        quantity, 
        setQuantity,
        stocks,
        filteredItems,
        handleQuantity,
        addToCart,
    }
}