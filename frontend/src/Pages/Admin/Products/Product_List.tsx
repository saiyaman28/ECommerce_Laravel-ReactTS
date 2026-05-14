import React, { useEffect, useState } from "react"
import axiosClient from "../../../axios"
import { useNavigate } from "react-router-dom"
import '../../../Assets/CSS/Pages/Product.sass'
import { Main, Section, Group, Href, Inputbox, Button } from '../../../Exporter/Components_Exporter'
import { AddPageTitle, AddClassBody, UseScreenWidth } from '../../../Exporter/Hooks_Exporter'

type ProductVariant = {
    id: number
    sku: string
    product_id: number
    variant_name: string
    price: number
    stock: number
}

type Product = {
    id: number
    product_name: string
    category_id: number
}

type Category = {
    id: number
    category_name: string
}

export default function ProductList() {
    AddPageTitle(`Product Variants`)
    AddClassBody(`Product-Page`)
    const screenwidth = UseScreenWidth()
    
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])

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

    return (
            <Main>
                <Section Title={`PRODUCTS`} ID={`list-product`}>
                    <Group>
                        <Button Title={`ADD PRODUCT`} Redirect={`/admin/product/create`} />
                        {products.map((p) => (
                            <Group Row key={p.id}>
                                <>
                                    {p.id} - {p.product_name} - {categories.find(c => c.id === p.category_id)?.category_name} - {p.description ? p.description : "No description"}
                                    <Button Title={`Edit`} Redirect={`/admin/product/edit/${p.id}`} />
                                    <Button Title={`Delete`} Redirect={`/admin/product/delete/${p.id}`} />
                                </>
                            </Group>
                        ))}
                    </Group>
                </Section>
            </Main>
    )
}