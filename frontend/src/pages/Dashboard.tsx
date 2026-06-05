import { useStateContext } from "../Context_Provider"

export default function DashboardPage() {
  const { user } = useStateContext()

  return (
    <>
      <h1>{user?.first_name} Customer Dashboard</h1>
    </>
  )
}
