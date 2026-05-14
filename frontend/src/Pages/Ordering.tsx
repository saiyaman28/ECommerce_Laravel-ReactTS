import React, { useEffect, useState } from "react"
import axiosClient from "../axios"
import { useNavigate } from "react-router-dom"
import '../Assets/CSS/Pages/Product.sass'
import { useStateContext } from "../context_provider"
import { Main, Section, Group, Href, Inputbox, Button } from '../Exporter/Components_Exporter'
import { AddPageTitle, AddClassBody, UseScreenWidth } from '../Exporter/Hooks_Exporter'
import { format } from "date-fns"

type Product = {
    id: number
    product_name: string
    category_id: number
    description: string
}

type Variant = {
  id: number
  variant_name: string
  price: number
  stock: number
}

type OrderItem = {
  product_variant_id: number;
  quantity: number;
}

export default function OrderListPage() {
    const { user } = useStateContext()
    AddPageTitle(`Orders`)
    AddClassBody(`Product-Page`)
    const screenwidth = UseScreenWidth()

    const [products, setProducts] = useState<Product[]>([])
    const [variants, setVariants] = useState<Variant[]>([])
    const [selectedItems, setSelectedItems] = useState<OrderItem[]>([])

    const [customerName, setCustomerName] = useState(`${user?.id}`)

    useEffect(() => {
        fetchProducts()
        fetchProductVariants()
    }, [])

    const fetchProducts = async () => {
        const res = await axiosClient.get("/products")
        setProducts(res.data || [])
    }

    const fetchProductVariants = async () => {
        const res = await axiosClient.get("/product_variants")
        setVariants(res.data || [])
    }

    const addItem = (variantId: number) => {
        const variant = variants.find((v) => v.id === variantId)

        if (!variant) return

        if (variant.stock <= 0) {
            alert("Out of stock")
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

        if (qty > variant.stock) {
            qty = variant.stock
        }

        setSelectedItems(
            selectedItems.map((i) => i.product_variant_id === variantId ? { ...i, quantity: qty } : i )
        )
    }
    
    const calculateTotal = () => {
        return selectedItems
            .reduce((sum, item) => {
                const v = variants.find((x) => x.id === item.product_variant_id)
                return v ? sum + v.price * item.quantity : sum
            }, 0).toFixed(2)
    }

    const submitOrder = async () => {
        if (selectedItems.length === 0) return;

        await axiosClient.post("/orders", {
            customer_name: customerName,
            items: selectedItems,
        })
        setSelectedItems([])
    }

    return (
            <Main>
                <Section Title={`ORDERS`} ID={`list-product`}>
                    <Group>
                        {variants.map((v) => (
                            <Group Row key={v.id}>
                                <>
                                    {products.find(c => c.id === v.product_id)?.product_name} - {v.variant_name} - ₱{v.price} - Stock:{v.stock}
                                    <Button Title={`Add`} OnClick={() => addItem(v.id)} Disabled={v.stock <= 0} />
                                </>
                            </Group>
                        ))}
                    </Group>
                </Section>
                <Section Title={`CART`} ID={`list-product`}>
                    <Group>
                        {selectedItems.map((i) => {
                            const v = variants.find((x) => x.id === i.product_variant_id)

                            if (!v) return null;

                            return (
                                <Group Row key={v.id}>
                                    {products.find(c => c.id === v.product_id)?.product_name} - {v.variant_name} - ₱{v.price} - 
                                    <Inputbox Type={`number`} Title={`Quantity`} Name={`Quantity`} Value={i.quantity} Min={1} Max={v.stock} OnChange={(e) =>updateQuantity(v.id,Number(e.target.value))} Required />
                                    <Button Title={`Remove`} OnClick={() => removeItem(v.id)} />
                                </Group>
                            )
                        })}
                    </Group>
                    <Group>
                        Total: ₱{calculateTotal()}
                        <Button Title={`Confirm Order`} OnClick={submitOrder} />
                    </Group>
                </Section>
            </Main>
    )
}