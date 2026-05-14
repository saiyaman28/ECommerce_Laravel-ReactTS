import React, { useEffect, useState } from "react"
import axiosClient from "../../../axios"
import { useNavigate } from "react-router-dom"
import '../../../Assets/CSS/Pages/Product.sass'
import { Main, Section, Group, Href, Inputbox, Button } from '../../../Exporter/Components_Exporter'
import { AddPageTitle, AddClassBody, UseScreenWidth } from '../../../Exporter/Hooks_Exporter'
import { format } from "date-fns"

type Order = {
    id: number
    customer_name: string
    customer_email: string
    total_price: number
    status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Canceled"
    created_at: Date
    updated_at: Date
}

export default function OrderListPage() {
    AddPageTitle(`Orders`)
    AddClassBody(`Product-Page`)
    const screenwidth = UseScreenWidth()

    const [orders, setOrders] = useState<Order[]>([])

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        const res = await axiosClient.get("/orders");
        setOrders(res.data || []);
    }

    return (
            <Main>
                <Section Title={`ORDERS`} ID={`list-product`}>
                    <Group>
                        {orders.map((o) => (
                            <Group Row key={o.id}>
                                <>
                                    {o.id} - {o.customer_name} - {o.customer_email} - {o.total_price} - {o.status} - {format(new Date(o.updated_at), 'MM/dd/yyyy hh:mm')} - {format(new Date(o.created_at), 'MM/dd/yyyy hh:mm')}
                                    <Button Title={`Edit`} Redirect={`/admin/orders/edit/${o.id}`} />
                                    {/* <Button Title={`Delete`} Redirect={`/admin/orders/delete/${o.id}`} /> */}
                                </>
                            </Group>
                        ))}
                    </Group>
                </Section>
            </Main>
    )
}