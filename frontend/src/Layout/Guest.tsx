import { Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../context_provider"
import { Header } from "../Exporter/Components_Exporter"

export default function GuestLayout() {
    const { user, token, loading } = useStateContext()

    if (loading) {
        return null
    }

    if (user && token) {
        if (user.role === "admin") {
            return <Navigate to="/admin/dashboard" replace />
        }
        else {
            return <Navigate to="/dashboard" replace />
        }
    }

    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}
