// import {React} from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import {useStateContext} from '../context_provider'
import {Header} from '../exporter/components'

export default function CustomerLayout() {
    const {user, loading} = useStateContext()

    if (loading) return null
    if (!user) return <Navigate to={`/`} replace />
    if (user.role !== `customer`) {
        return <Navigate to={`/admin`} replace />
    }
    
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}