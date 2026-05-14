import { React, useEffect, useState } from "react"
import axiosClient from "../../../axios"
import '../../../Assets/CSS/Pages/Create_Product.sass'
import { Main, Section, Group, Href, Inputbox, Button, Selectionbox } from '../../../Exporter/Components_Exporter'
import { AddPageTitle, AddClassBody, UseScreenWidth } from '../../../Exporter/Hooks_Exporter'
import { useNavigate, useParams } from "react-router-dom"

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
        product_name: "",
        category_id: "",
        description: ""
    })

    const [categories, setCategories] = useState<Category[]>([])

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchCategories()
        fetchProduct()
    }, [])

    const fetchCategories = async () => {
        const res = await axiosClient.get("/categories")
        const data = res.data?.data ?? res.data ?? []
        setCategories(data)
    } 

    const fetchProduct = async () => {
        const res = await axiosClient.get(`/products/${id}`)
        setForm({
            product_name: res.data.product_name || "",
            category_id: String(res.data.category_id || ""),
            description: res.data.description || "",
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!form.product_name.trim() || !form.category_id) {
            setError("Please fill all required fields")
            return
        }

        setLoading(true)
        setError(null)

        try {
            await axiosClient.put(`/products/${id}`, {
                product_name: form.product_name,
                category_id: Number(form.category_id),
                description: form.description,
            })
            alert("Product updated")
            navigate("/admin/product")
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
            <Section Title={`Edit Product`} ID={`create-product`}>
                <form onSubmit={handleSubmit}>
                    {error && <p>{error}</p>}

                    <Inputbox Title={`Product`} Name={`Product`} Value={form.product_name} OnChange={(e) => setForm({...form, product_name: e.target.value})} Required />
                    <Selectionbox Title="Category" Name="category_id" Value={form.category_id} OnChange={(e) => setForm({ ...form, category_id: e.target.value, })} Required
                        Options={categories.map((c) => ({
                            Value: c.id,
                            Title: c.category_name,
                        }))}
                    />
                    <Inputbox Title={`Description`} Name={`Description`} Value={form.description} OnChange={(e) => setForm({...form, description: e.target.value})} />

                    <Button Submit Disabled={loading} Title={loading ? `Submitting...` : `Submit`} />
                </form>
            </Section>
        </Main>
    )
}