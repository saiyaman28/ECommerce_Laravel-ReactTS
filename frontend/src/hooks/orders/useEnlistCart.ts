import {useState, useEffect} from 'react'
import {useStateContext} from '../../context_provider'
import {type Products, type ProductVariants, type OrderItems} from '../../exporter/data'
import {retrieveProducts, retrieveProductVariants, createOrders} from '../../exporter/api'

export default function useEnlistCart() {
    const {user} = useStateContext()

    const [products, setProducts] = useState<Pick<Products, `id` | `product_name`>[]>([])
    const [variants, setVariants] = useState<Pick<ProductVariants, `id` | `product_id` | `variant_name` | `stock` | `price`>[]>([])
    const [cart, setCart] = useState<Pick<OrderItems, `product_variant_id` | `quantity`>[]>([])

    useEffect(() => {
        const load = async () => {
            setProducts(await retrieveProducts())
            setVariants(await retrieveProductVariants())

            const stored = JSON.parse(localStorage.getItem(`cart`) || `[]`)

            const clean = stored.filter((i: any) =>i.product_variant_id &&i.quantity > 0)
                .map((i: any) => ({product_variant_id: Number(i.product_variant_id),quantity: Number(i.quantity),}))

            setCart(clean)
            localStorage.setItem(`cart`, JSON.stringify(clean))
        }
        load()
    }, [])

    const saveCart = (items: typeof cart) => {
        setCart(items)
        localStorage.setItem(`cart`, JSON.stringify(items))
    }

    const getStock = (variantId: number) => {
        const v = variants.find((x) => Number(x.id) === Number(variantId))
        return Number(v?.stock || 0)
    }

    const removeItem = (id: number) => {
        saveCart(cart.filter((i) =>Number(i.product_variant_id) !==Number(id)))
    }

    const updateQty = (id: number, qty: number) => {
        const stock = getStock(id)

        if (!stock) return
        if (qty < 1) qty = 1
        if (qty > stock) qty = stock

        saveCart(cart.map((i) =>Number(i.product_variant_id) ===Number(id)
            ? { ...i, quantity: qty } : i
        ))
    }

    const total = cart.reduce((sum, item) => {
        const v = variants.find((x) => Number(x.id) === Number(item.product_variant_id))

        return v ? sum + Number(v.price) * Number(item.quantity) : sum
    }, 0).toFixed(2)

    const handleCheckout = async () => {
        if (!cart.length) return

        const cleanItems = cart
            .filter((i) => i.product_variant_id && Number(i.quantity) > 0)
            .map((i) => ({product_variant_id: Number(i.product_variant_id), quantity: Number(i.quantity),
        }))

        if (!cleanItems.length) {
            alert(`Cart is invalid`)
            return
        }

        try {
            await createOrders({
                customer_id: Number(user?.id),
                items: cleanItems,
            })
            localStorage.removeItem(`cart`)
            setCart([])
            alert(`Order placed successfully`)
        } 
        catch (err: any) {
            console.error(err.response?.data || err)
            alert(`Checkout failed`)
        }
    }

    return {
        products,
        setProducts,
        variants,
        setVariants,
        cart,
        setCart,
        saveCart,
        getStock,
        removeItem,
        updateQty,
        total,
        handleCheckout
    }
}