import { useState } from "react"
import { useStateContext } from "../context_provider"

export default function ChangePasswordPage() {
  const { changePassword } = useStateContext()

  const [form, setForm] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const submit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const msg = await changePassword(form)
      setMessage(msg + " ✅")
      setForm({
        current_password: "",
        password: "",
        password_confirmation: "",
      })
    } catch (err: any) {
      setMessage(
        err.response?.data?.message ||
        err.response?.data?.errors?.current_password?.[0] ||
        "Failed to change password"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit}>
      <h2>Change Password</h2>

      {message && <p>{message}</p>}

      <input
        type="password"
        placeholder="Current Password"
        value={form.current_password}
        onChange={e => setForm({ ...form, current_password: e.target.value })}
        required
      />

      <input
        type="password"
        placeholder="New Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        required
      />

      <input
        type="password"
        placeholder="Confirm New Password"
        value={form.password_confirmation}
        onChange={e =>
          setForm({ ...form, password_confirmation: e.target.value })
        }
        required
      />

      <button disabled={loading}>
        {loading ? "Updating..." : "Change Password"}
      </button>
    </form>
  )
}
