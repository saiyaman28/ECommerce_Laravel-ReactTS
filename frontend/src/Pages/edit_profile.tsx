import { useEffect, useState } from "react"
import { useStateContext } from "../context_provider"

export default function EditProfilePage() {
  const { user, updateProfile } = useStateContext()

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    contact: "",
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (user) {
      setForm({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        contact: (user as any).contact || "",
      })
    }
  }, [user])

  const submit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      await updateProfile(form)
      setMessage("Profile updated successfully ✅")
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Update failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit}>
      <h2>Edit Profile</h2>

      {message && <p>{message}</p>}

      <input
        value={form.first_name}
        onChange={e => setForm({ ...form, first_name: e.target.value })}
        placeholder="First Name"
      />

      <input
        value={form.last_name}
        onChange={e => setForm({ ...form, last_name: e.target.value })}
        placeholder="Last Name"
      />

      <input
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        placeholder="Email"
      />

      <input
        value={form.contact}
        onChange={e => setForm({ ...form, contact: e.target.value })}
        placeholder="Contact"
      />

      <button disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  )
}
