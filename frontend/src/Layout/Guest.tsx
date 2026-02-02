import { Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../context_provider"
import { Header } from "../Exporter/Components_Exporter"

export default function GuestLayout() {
  const { user, token, loading } = useStateContext()

  // ⏳ wait until auth state is known
  if (loading) {
    return null // or spinner
  }

  // 👇 already logged in → redirect ONCE
  if (token && user) {
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />
    }
    return <Navigate to="/dashboard" replace />
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
