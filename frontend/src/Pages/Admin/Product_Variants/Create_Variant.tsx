import { React, useEffect, useState } from "react"
import axiosClient from "../../../axios"
import '../../../Assets/CSS/Pages/Create_Product.sass'
import { Main, Section, Group, Href, Inputbox, Button, Selectionbox } from '../../../Exporter/Components_Exporter'
import { AddPageTitle, AddClassBody, UseScreenWidth } from '../../../Exporter/Hooks_Exporter'
import { useNavigate } from "react-router-dom"

type Product = {
    id: number
    product_name: string
    category_id: number
    description: string
}

type Category = {
    id: number
    category_name: string
}

export default function CreateProductPage() { 
    AddPageTitle(`Create Product`)
    AddClassBody(`Create-Product-Page`)
    const screenwidth = UseScreenWidth()

    const navigate = useNavigate()

    const [form, setForm] = useState({
        product_id: "",
        variant_name: "",
        price: "",
        stock: "",
    })

    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])

    const [error, setError] = useState(``)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchCategories()
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        const res = await axiosClient.get("/products")
        setProducts(res.data || [])
    }

    const fetchCategories = async () => {
        const res = await axiosClient.get("/categories")
        setCategories(res.data || [])
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if (!form.product_id || !form.variant_name || !form.price || !form.stock) return

        setLoading(true)
        setError(null)

        try {
            await axiosClient.post("/product_variants", form)
            alert(`Variant created`)
            navigate("/admin/product/variant")
        } 
        catch (err) {
            setError("Failed to create variant")
            console.log(err)
        } 
        setLoading(false)
    }

    return (
        <Main>
            <Section Title={`Create Product`} ID={`create-product`}>
                <form onSubmit={handleSubmit}>
                    {error && <p>{error}</p>}
                    <Selectionbox Title="Product" Name="product_id" Value={form.product_id} OnChange={(e) => setForm({ ...form, product_id: e.target.value, })} Required
                        Options={products.map((p) => ({
                            Value: p.id,
                            Title: p.product_name,
                        }))}
                    />
                    <Inputbox Title={`Variant`} Name={`Variant`} Value={form.variant_name} OnChange={(e) => setForm({...form, variant_name: e.target.value})} Required />
                    <Inputbox Title={`Price`} Name={`Price`} Value={form.price} OnChange={(e) => setForm({...form, price: e.target.value})} Required />
                    <Inputbox Title={`Stock`} Name={`Stock`} Value={form.stock} OnChange={(e) => setForm({...form, stock: e.target.value})} />

                    <Button Submit Disabled={loading} Title={loading ? `Submitting...` : `Submit`} />
                </form>
            </Section>
        </Main>
    )
}