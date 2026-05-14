import { useState } from "react"
import { useStateContext } from "../context_provider"
import '../Assets/CSS/Pages/Change_Password.sass'
import { Main, Section, Group, Href, Inputbox, Button } from '../Exporter/Components_Exporter'
import { AddPageTitle, AddClassBody, UseScreenWidth } from '../Exporter/Hooks_Exporter'

export default function ChangePasswordPage() {
    AddPageTitle(`Change Password`)
    AddClassBody(`Change-Password-Page`)
    const screenwidth = UseScreenWidth()

    const { changePassword } = useStateContext()

    const [form, setForm] = useState({
        current_password: "",
        password: "",
        password_confirmation: "",
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        setLoading(true)
        setError(null)

        if (form.password !== form.password_confirmation) {
            setError(`Passwords do not match`)
            setLoading(false)
            return
        }

        try {
            await changePassword(form)
            alert(`Password changed successfully!`)
            setForm({
                current_password: "",
                password: "",
                password_confirmation: "",
            })
        } 
        catch (err: any) {
            setError(err.response?.data?.message || "Password change failed")
        } 
        setLoading(false)
    }

    return (
        <Main>
            <Section Title={`Change Password`} ID={`change-password`}>
                <form onSubmit={handleSubmit}>
                    {error && <p>{error}</p>}

                    <Inputbox Type={`password`} Title={`Current Password`} Name={`Current Password`} Value={form.current_password} OnChange={e => setForm({...form, current_password: e.target.value})} Required />
                    <Inputbox Type={`password`} Title={`Password`} Name={`Password`} Value={form.password} OnChange={e => setForm({...form, password: e.target.value})} Required />
                    <Inputbox Type={`password`} Title={`Confirm Password`} Name={`Confirm Password`} Value={form.password_confirmation} OnChange={e => setForm({...form, password_confirmation: e.target.value})} Required />

                    <Button Submit Disabled={loading} Title={loading ? `Submitting...` : `Submit`} />
                </form>
            </Section>
        </Main>
    )
}