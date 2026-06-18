import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { type Categories, type Products, type ProductVariants } from '../../exporter/data'
import { fetchProductVariants, retrieveProducts, retrieveCategories, retrieveProductVariants } from '../../exporter/api'

export default function useViewProducts() {
    const [categories, setCategories] = useState<Pick<Categories, `id` | `category_name`>[]>([])
    const [products, setProducts] = useState<Pick<Products, `id` | `product_name` | `category_id` | `description` | `image`>[]>([])
    const [variants, setVariants] = useState<Pick<ProductVariants, `id` | `product_id` | `variant_name` | `stock` | `price` | `image`>[]>([])

    const [selectedVariant, setselectedVariant] = useState<Pick<ProductVariants, `id` | `product_id` | `variant_name` | `stock` | `price` | `image`> | null>(null)
    const [quantity, setQuantity] = useState<number>(1)

    const { id } = useParams()

    useEffect(() => {
        if (!id) return
        const load = async () => {
            setCategories(await retrieveCategories())
            setProducts(await retrieveProducts())
            setVariants(await retrieveProductVariants())
            const res = await fetchProductVariants(id)
            setselectedVariant(res.data)
        }
        load()
    }, [id])

    const product = products.find((p) => Number(p.id) === Number(selectedVariant?.product_id))

    const filteredItems = selectedVariant && {
        ...selectedVariant,
        product_name: product?.product_name,
        description: product?.description,
    }

    const stocks = Number(selectedVariant?.stock || 0)

    const handleQuantity = (value: number) => {
        if (value < 1) value = 1
        if (value > stocks) value = stocks

        setQuantity(value)
    }

    const addToCart = () => {
        if (!selectedVariant) return

        const cart = JSON.parse(localStorage.getItem(`cart`) || `[]`)

        const existing = cart.find((i: any) => Number(i.product_variant_id) === Number(selectedVariant.id))

        const currentQty = existing ? existing.quantity : 0
        const newTotalQty = currentQty + quantity

        if (newTotalQty > stocks) {
            alert(`Cannot add more than stock (${stocks})`)
            return
        }
        if (existing) existing.quantity = newTotalQty
        
        else cart.push({product_variant_id: Number(selectedVariant.id), quantity})
        
        alert(`Added to cart`)
        localStorage.setItem(`cart`, JSON.stringify(cart))
    }

    const currentVariant = variants.find((v) => Number(v.id) === Number(id))

    const currentProduct = currentVariant && products.find((p) => Number(p.id) === Number(currentVariant.product_id))

    const similarItems = currentProduct
        ? products
            .filter((p) =>Number(p.category_id) === Number(currentProduct.category_id) &&Number(p.id) !== Number(currentProduct.id))
            .slice(0, 6)
            .map((p) => {
                const productVariants = variants.filter((v) => Number(v.product_id) === Number(p.id))

                const variant =
                    productVariants[0] ||
                    productVariants.sort(
                        (a, b) => Number(a.price) - Number(b.price)
                    )[0]

                return {
                    id: variant.id,
                    product_name: p.product_name,
                    category_name: categories.find((c) => Number(c.id) === Number(p.category_id))?.category_name,
                    variant_name: variant?.variant_name,
                    price: variant?.price,
                    stock: variant?.stock,
                    image: variant?.image,
                }
            })
        : []

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
        similarItems,
        setselectedVariant,
    }
}