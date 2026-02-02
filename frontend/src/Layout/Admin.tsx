import { Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../context_provider"
import { Header } from "../Exporter/Components_Exporter"

export default function AdminLayout() {
  const { user, loading } = useStateContext()

  if (loading) {
    return null
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (user.role !== "admin") {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
