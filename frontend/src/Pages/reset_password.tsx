import { useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useStateContext } from "../Context_Provider"

export default function ResetPasswordPage() {
  const { resetPassword } = useStateContext()
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const email = params.get("email") || ""
  const token = params.get("token") || ""

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await resetPassword({
        email,
        token,
        password,
        password_confirmation: passwordConfirmation,
      })

      alert("Password reset successful!")
      navigate("/login")
    } catch (err: any) {
      setError(err.response?.data?.message || "Reset failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Reset Password</h1>

      <form onSubmit={submit}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm password"
          value={passwordConfirmation}
          onChange={e => setPasswordConfirmation(e.target.value)}
          required
        />

        <button disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
}
