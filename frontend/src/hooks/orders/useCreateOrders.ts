import {useState, useEffect} from 'react'
import {useStateContext} from '../../context_provider'
import {type Products, type ProductVariants, type OrderItems} from '../../exporter/data'
import {retrieveProducts, retrieveProductVariants, createOrders} from '../../exporter/api'

export default function useCreateOrders() {
    const {user} = useStateContext()

    const [products, setProducts] = useState<Pick<Products, `id` | `product_name`>[]>([])
    const [variants, setVariants] = useState<Pick<ProductVariants, `id` | `product_id` | `variant_name` | `stock` | `price`>[]>([])
    const [selectedItems, setSelectedItems] = useState<Pick<OrderItems, `product_variant_id` | `quantity`>[]>([])

    const [search, setSearch] = useState<string | null>(``)

    useEffect(() => {
        const load = async () => {
            setProducts(await retrieveProducts())
            setVariants(await retrieveProductVariants())
        }
        load()
    }, [])

    const handleSearch = variants.filter((v) => {
        const searchValue = (search || ``).toLowerCase()
        const productName = products.find((c) => c.id === v.product_id)?.product_name || ``

        if (!searchValue) return true

        return (
            productName.toLowerCase().includes(searchValue) ||
            v.variant_name.toLowerCase().includes(searchValue)
        )
    })

    const addItem = (variantId: number) => {
        const variant = variants.find((v) => v.id === variantId)

        if (!variant) return

        if (Number(variant.stock) <= 0) {
            alert(`Out of stock`)
            return
        }

        const exists = selectedItems.find(
            (i) => i.product_variant_id === variantId
        )

        if (exists) return

        setSelectedItems([
            ...selectedItems,
            {
                product_variant_id: variantId,
                quantity: 1,
            },
        ])
    }

    const removeItem = (variantId: number) => {
        setSelectedItems(selectedItems.filter((i) => i.product_variant_id !== variantId))
    }

    const updateQuantity = (variantId: number, qty: number) => {
        const variant = variants.find((v) => v.id === variantId)

        if (!variant) return

        if (qty < 1) qty = 1

        if (qty > Number(variant.stock)) {
            qty = Number(variant.stock)
        }

        setSelectedItems(
            selectedItems.map((i) => i.product_variant_id === variantId ? { ...i, quantity: qty } : i )
        )
    }

    const calculateTotal = () => {
        return selectedItems
            .reduce((sum, item) => {
                const v = variants.find((x) => x.id === item.product_variant_id)
                return v ? sum + Number(v.price) * Number(item.quantity) : sum
            }, 0).toFixed(2)
    }

    const submitOrder = async () => {
        if (selectedItems.length === 0) return

        await createOrders({
            customer_id: Number(user?.id),
            items: selectedItems,
        })
        alert(`Order complete`)
        setSelectedItems([])
    }

    return {
        products,
        setProducts,
        variants,
        setVariants,
        selectedItems,
        setSelectedItems,
        search,
        setSearch,
        handleSearch,
        addItem,
        removeItem,
        updateQuantity,
        calculateTotal,
        submitOrder
    }
}