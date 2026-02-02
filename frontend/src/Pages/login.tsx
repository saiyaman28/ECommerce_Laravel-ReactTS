import { useState } from "react"
import { useStateContext } from "../Context_Provider";

export default function Login() {
  const { login } = useStateContext()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

const submit = async (e: any) => {
  e.preventDefault()

  console.log("LOGIN PAYLOAD:", {
    email,
    password,
  })

  try {
    await login({ email, password })
  } catch (err: any) {
    console.error("LOGIN ERROR:", err.response?.data || err)
  }
}

  return (
    <form onSubmit={submit}>
      <input onChange={e => setEmail(e.target.value)} />
      <input type="password" onChange={e => setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  )
}

const styles: any = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },
  card: {
    width: 350,
    padding: 24,
    background: "#fff",
    borderRadius: 8,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 12,
  },
  button: {
    width: "100%",
    padding: 10,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
};


