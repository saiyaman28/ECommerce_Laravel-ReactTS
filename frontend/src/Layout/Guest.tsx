// import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../Exporter/Components_Exporter'

export default function GuestLayout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}