import React, { useEffect, useState } from "react"
import axiosClient from "../../../axios"
import { useNavigate } from "react-router-dom"
import '../../../Assets/CSS/Pages/Category.sass'
import { Main, Section, Group, Href, Inputbox, Button } from '../../../Exporter/Components_Exporter'
import { AddPageTitle, AddClassBody, UseScreenWidth } from '../../../Exporter/Hooks_Exporter'

type Category = {
  id: number
  category: string
}

export default function CategoryList() {
    AddPageTitle(`Category`)
    AddClassBody(`Category-Page`)
    const screenwidth = UseScreenWidth()
    
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        const res = await axiosClient.get("/categories")
        setCategories(res.data || [])
    }

    return (
            <Main>
                <Section Title={`CATEGORIES`} ID={`list-category`}>
                    <Group>
                        <Button Title={`ADD CATEGORY`} Redirect={`/admin/category/create`} />
                        {categories.map((c) => (
                            <Group Row key={c.id}>
                                <>
                                    {c.id} - {c.category_name}
                                    <Button Title={`Edit`} Redirect={`/admin/category/edit/${c.id}`} />
                                    <Button Title={`Delete`} Redirect={`/admin/category/delete/${c.id}`} />
                                </>
                            </Group>
                        ))}
                    </Group>
                </Section>
            </Main>
    )
}