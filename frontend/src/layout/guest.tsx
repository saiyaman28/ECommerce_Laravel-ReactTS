// import {React} from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import {useStateContext} from '../context_provider'
import {Header} from '../exporter/components'

export default function GuestLayout() {
    const {user, token, loading} = useStateContext()

    if (loading) return null

    if (user && token) {
        return (
            <Navigate to={user.role === `customer` ? `/customer` : user.role === `admin` ? `/admin` : `/`} replace />
        )
    }

    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}