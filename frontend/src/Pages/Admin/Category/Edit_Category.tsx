import React, { useEffect, useState } from "react"
import axiosClient from "../../../axios"
import '../../../Assets/CSS/Pages/Create_Category.sass'
import { Main, Section, Group, Href, Inputbox, Button } from '../../../Exporter/Components_Exporter'
import { AddPageTitle, AddClassBody, UseScreenWidth } from '../../../Exporter/Hooks_Exporter'
import { useNavigate, useParams } from "react-router-dom"

export default function EditCategoryPage() { 
    AddPageTitle(`Edit Category`)
    AddClassBody(`Create-Category-Page`)
    const screenwidth = UseScreenWidth()
    
    const { id } = useParams()
    const navigate = useNavigate()

    const [categoryName, setcategoryName] = useState("")

    const [error, setError] = useState(``)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchCategory()
    }, [])

    const fetchCategory = async () => {
        try {
            const res = await axiosClient.get(`/categories/${id}`)
            setcategoryName(res.data.category_name)
        } 
        catch (err) {
            setError("Failed to load category")
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        setLoading(true)
        setError(null)

        try {
            await axiosClient.put(`/categories/${id}`, {category_name: categoryName})
            alert(`Category updated`)
            navigate("/admin/category")
        } 
        catch (err: any) {
            setError(err.response?.data?.message || "Update failed")
        } 
        setLoading(false)
    }

    return (
        <Main>
            <Section Title={`Edit Category`} ID={`create-category`}>
                <form onSubmit={handleSubmit}>
                    {error && <p>{error}</p>}

                    <Inputbox Type={`text`} Title={`Category`} Name={`Category`} Value={`${categoryName}`} OnChange={(e) => setcategoryName(e.target.value)} Required />

                    <Button Submit Disabled={loading} Title={loading ? `Submitting...` : `Submit`} />
                </form>
            </Section>
        </Main>
    )
}