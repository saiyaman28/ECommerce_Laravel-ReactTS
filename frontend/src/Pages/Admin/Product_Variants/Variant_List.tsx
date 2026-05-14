import React, { useEffect, useState } from "react"
import axiosClient from "../../../axios"
import { useNavigate } from "react-router-dom"
import '../../../Assets/CSS/Pages/Product.sass'
import { Main, Section, Group, Href, Inputbox, Button } from '../../../Exporter/Components_Exporter'
import { AddPageTitle, AddClassBody, UseScreenWidth } from '../../../Exporter/Hooks_Exporter'

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

export default function ProductVariantList() {
    AddPageTitle(`Product Variants`)
    AddClassBody(`Product-Page`)
    const screenwidth = UseScreenWidth()
    
    const [variants, setVariants] = useState<Product[]>([])
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        fetchCategories()
        fetchProducts()
        fetchProductVariants()
    }, [])

    const fetchProductVariants = async () => {
        const res = await axiosClient.get("/product_variants")
        setVariants(res.data || [])
    }

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
                <Section Title={`PRODUCT VARIANTS`} ID={`list-product`}>
                    <Group>
                        <Button Title={`ADD VARIANT`} Redirect={`/admin/product/variant/create`} />
                        {variants.map((p) => (
                            <Group Row key={p.id}>
                                <>
                                    {p.id} - {products.find(c => c.id === p.product_id)?.product_name} - {p.variant_name} - {p.price} - {p.stock}
                                    <Button Title={`Edit`} Redirect={`/admin/product/variant/edit/${p.id}`} />
                                    <Button Title={`Delete`} Redirect={`/admin/product/variant/delete/${p.id}`} />
                                </>
                            </Group>
                        ))}
                    </Group>
                </Section>
            </Main>
    )
}