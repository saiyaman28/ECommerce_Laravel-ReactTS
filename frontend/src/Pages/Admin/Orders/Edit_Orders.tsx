import { React, useEffect, useState } from "react"
import axiosClient from "../../../axios"
import '../../../Assets/CSS/Pages/Create_Product.sass'
import { Main, Section, Group, Href, Inputbox, Button, Selectionbox } from '../../../Exporter/Components_Exporter'
import { AddPageTitle, AddClassBody, UseScreenWidth } from '../../../Exporter/Hooks_Exporter'
import { useNavigate, useParams } from "react-router-dom"

type Order = {
    id: number
    customer_name: string
    customer_email: string
    total_price: number
    status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Canceled"
}

type OrderItems = {
    id: number
    order_id: number
    product_variant_id: number
    quantity: number
    total_price: number
    created_at: Date
    updated_at: Date
}

type Product = {
    id: number
    product_name: string
    category_id: number
    description: string
}

type Variant = {
    id: number
    product_id: number
    variant_name: string
    price: number
    stock: number
}

export default function EditOrderPage() {
    AddPageTitle("Edit Orders")
    AddClassBody("Create-Product-Page")
    const screenwidth = UseScreenWidth()

    const { id } = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        customer_name: "",
        customer_email: "",
        total_price: "",
        status: "",
    })

    const [products, setProducts] = useState<Product[]>([])
    const [orderitems, setOrderItems] = useState<OrderItems[]>([])
    const [variants, setVariants] = useState<Variant[]>([])

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchOrder()
        fetchOrderItems()
        fetchProducts()
        fetchProductVariants()
    }, [])

    const fetchProducts = async () => {
        const res = await axiosClient.get("/products")
        setProducts(res.data || [])
    }

    const fetchOrder = async () => {
        const res = await axiosClient.get(`/orders/${id}`)
        setForm({
            customer_name: String(res.data.customer_name || ""),
            customer_email: res.data.customer_email || "",
            total_price: res.data.total_price || "",
            status: res.data.status || "",
        })
    }

    const fetchOrderItems = async () => {
        const res = await axiosClient.get("/order_items");
        setOrderItems(res.data || []);
    }

    const fetchProductVariants = async () => {
        const res = await axiosClient.get("/product_variants")
        setVariants(res.data || [])
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setLoading(true)
        setError(null)

        try {
            await axiosClient.put(`/orders/${id}`, {status: form.status,})
            alert("Order updated")
            navigate("/admin/orders")
        } 
        catch (err: any) {
            console.log(err?.response?.data || err)
            setError(
                err?.response?.data?.message ||
                "Update failed"
            )
        }
        setLoading(false)
    }

    return (
        <Main>
            <Section Title={`Edit Variant`} ID={`create-product`}>
                <form onSubmit={handleSubmit}>
                    {error && <p>{error}</p>}
                    <Inputbox Disabled Title={`Name`} Name={`Name`} Value={form.customer_name} OnChange={(e) => setForm({...form, customer_name: e.target.value})} Required />
                    <Inputbox Disabled Title={`Email`} Name={`Email`} Value={form.customer_email} OnChange={(e) => setForm({...form, customer_email: e.target.value})} Required />
                    <Selectionbox Title="Status" Name="Status" Value={form.status} OnChange={(e) => setForm({ ...form, status: e.target.value, })} Required
                        Options={[
                            { Title: "Pending", Value: "Pending" },
                            { Title: "Processing", Value: "Processing" },
                            { Title: "Shipped", Value: "Shipped" },
                            { Title: "Delivered", Value: "Delivered" },
                            { Title: "Canceled", Value: "Canceled" },
                        ]}
                    />
                    <Group>
                        {orderitems
                            .filter((i) => i.order_id === Number(id))
                            .map((i) => {
                                const variant = variants.find(
                                    (v) => v.id === i.product_variant_id
                                )

                                const product = products.find(
                                    (p) => p.id === variant?.product_id
                                )

                                return (
                                    <Group Row key={i.id}>
                                        {product?.product_name} - {variant?.variant_name} - Quantity: {i.quantity} - {i.total_price}
                                    </Group>
                                )
                            })}
                            <Group>
                                TOTAL: {form.total_price}
                            </Group>
                    </Group>
                    <Button Submit Disabled={loading} Title={loading ? `Submitting...` : `Submit`} />
                </form>
            </Section>
        </Main>
    )
}