import React, { useEffect, useState } from "react"
import axiosClient from "../../../axios"
import '../../../Assets/CSS/Pages/Create_Category.sass'
import { Main, Section, Group, Href, Inputbox, Button } from '../../../Exporter/Components_Exporter'
import { AddPageTitle, AddClassBody, UseScreenWidth } from '../../../Exporter/Hooks_Exporter'
import { useNavigate } from "react-router-dom"

export default function CreateCategoryPage() { 
    AddPageTitle(`Create Category`)
    AddClassBody(`Create-Category-Page`)
    const screenwidth = UseScreenWidth()

    const navigate = useNavigate()

    const [categoryName, setcategoryName] = useState("")

    const [error, setError] = useState(``)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        setLoading(true)
        setError(null)

        if (!categoryName) return;

        try {
            await axiosClient.post("/categories", { category_name: categoryName })
            alert(`Category created`)
            navigate("/admin/category")
        } 
        catch (err) {
            setError("Failed to create category")
        } 
        setLoading(false)
    };

    return (
        <Main>
            <Section Title={`Create Category`} ID={`create-category`}>
                <form onSubmit={handleSubmit}>
                    {error && <p>{error}</p>}

                    <Inputbox Title={`Category`} Name={`Category`} Value={categoryName} OnChange={(e) => setcategoryName(e.target.value)} Required />

                    <Button Submit Disabled={loading} Title={loading ? `Submitting...` : `Submit`} />
                </form>
            </Section>
        </Main>
    )
}