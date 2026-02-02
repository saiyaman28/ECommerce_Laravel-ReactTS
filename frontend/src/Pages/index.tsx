import { useState } from "react";
import { useStateContext } from "../Context_Provider";
import { useNavigate, Link } from "react-router-dom";

export default function IndexPage() {
  const { register } = useStateContext()
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    contact: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e: any) => {
  e.preventDefault()
  setLoading(true)
  setError("")

  try {
    await register(form)
  } catch (err: any) {
    setError(err.response?.data?.message || "Registration failed")
  } finally {
    setLoading(false)
  }
}


  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2>Register</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input type="text" placeholder="First Name" value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} required style={styles.input} />
        <input type="text" placeholder="Last Name" value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} required style={styles.input} />
        <input type="text" placeholder="Contact" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} required style={styles.input} />
        <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required style={styles.input} />
        <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required style={styles.input} />

        <button disabled={loading} style={styles.button}>
          {loading ? "Creating account..." : "Register"}
        </button>

        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
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
    background: "#16a34a",
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
