import { React, useEffect, useState } from "react"
import axiosClient from "../../../axios"
import '../../../Assets/CSS/Pages/Create_Product.sass'
import { Main, Section, Group, Href, Inputbox, Button, Selectionbox } from '../../../Exporter/Components_Exporter'
import { AddPageTitle, AddClassBody, UseScreenWidth } from '../../../Exporter/Hooks_Exporter'
import { useNavigate } from "react-router-dom"

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
        product_name: "",
        category_id: "",
        description: "",
    })

    const [categories, setCategories] = useState<Category[]>([])

    const [error, setError] = useState(``)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        const res = await axiosClient.get("/categories")
        setCategories(res.data || [])
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if (!form.product_name || !form.category_id) return

        setLoading(true)
        setError(null)

        try {
            await axiosClient.post("/products", form)
            alert(`Product created`)
            navigate("/admin/product")
        } 
        catch (err) {
            setError("Failed to create product")
        } 
        setLoading(false)
    }

    return (
        <Main>
            <Section Title={`Create Product`} ID={`create-product`}>
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