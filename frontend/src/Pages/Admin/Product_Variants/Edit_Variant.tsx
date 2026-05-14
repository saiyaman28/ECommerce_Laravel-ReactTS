import { React, useEffect, useState } from "react"
import axiosClient from "../../../axios"
import '../../../Assets/CSS/Pages/Create_Product.sass'
import { Main, Section, Group, Href, Inputbox, Button, Selectionbox } from '../../../Exporter/Components_Exporter'
import { AddPageTitle, AddClassBody, UseScreenWidth } from '../../../Exporter/Hooks_Exporter'
import { useNavigate, useParams } from "react-router-dom"

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

export default function EditCategoryPage() {
    AddPageTitle("Edit Product")
    AddClassBody("Create-Product-Page")
    const screenwidth = UseScreenWidth()

    const { id } = useParams()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        product_id: "",
        variant_name: "",
        price: "",
        stock: "",
    })

    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchCategories()
        fetchProducts()
        fetchVariant()
    }, [])

    const fetchProducts = async () => {
        const res = await axiosClient.get("/products")
        setProducts(res.data || [])
    }

    const fetchCategories = async () => {
        const res = await axiosClient.get("/categories")
        setCategories(res.data || [])
    }

    const fetchVariant = async () => {
        const res = await axiosClient.get(`/product_variants/${id}`)
        setForm({
            product_id: String(res.data.product_id || ""),
            variant_name: res.data.variant_name || "",
            price: res.data.price || "",
            stock: res.data.stock || "",
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!form.product_id || !form.variant_name || !form.price || !form.stock) {
            setError("Please fill all required fields")
            return
        }

        setLoading(true)
        setError(null)

        try {
            await axiosClient.put(`/product_variants/${id}`, {
                product_id: Number(form.product_id),
                variant_name: form.variant_name,
                price: form.price,
                stock: form.stock,
            })
            alert("Variant updated")
            navigate("/admin/product/variant")
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