import { React, useState } from 'react'
import { useStateContext } from '../context_provider'
import { useSearchParams, useNavigate } from 'react-router-dom'
import '../Assets/CSS/Pages/Reset_Password.sass'
import { Main, Section, Group, Href, Inputbox, Button } from '../Exporter/Components_Exporter'
import { AddPageTitle, AddClassBody, UseScreenWidth } from '../Exporter/Hooks_Exporter'

export default function ResetPasswordPage() {
    AddPageTitle(`Reset Password`)
    AddClassBody(`Reset-Password-Page`)
    const screenwidth = UseScreenWidth()

    const { resetPassword } = useStateContext()

    const [form, setForm] = useState({
        password: "",
        password_confirmation: "",
    })
    const [params] = useSearchParams()
    const email = params.get(`email`) || ``
    const token = params.get(`token`) || ``

    const [error, setError] = useState(``)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    const handleSubmit = async (e: any) => {
        e.preventDefault()

        setLoading(true)
        setError(``)

        if (form.password !== form.password_confirmation) {
            setError(`Passwords do not match`)
            setLoading(false)
            return
        }

        try {
            await resetPassword({email, token, password: form.password, password_confirmation: form.password_confirmation})
            alert(`Password reset successful!`)
            navigate("/")
        } 
        catch (err: any) {
            setError(err.response?.data?.message || "Reset failed")
        } 
        setLoading(false)
    }

    return (
        <Main>
            <Section Title={`Reset Password`} ID={`reset-password`}>
                <form onSubmit={handleSubmit}>
                    {error && <p>{error}</p>}

                    <Inputbox Type={`password`} Title={`Password`} Name={`Password`} Value={form.password} OnChange={e => setForm({...form, password: e.target.value})} Required />
                    <Inputbox Type={`password`} Title={`Confirm Password`} Name={`Confirm Password`} Value={form.password_confirmation} OnChange={e => setForm({...form, password_confirmation: e.target.value})} Required />

                    <Button Submit Disabled={loading} Title={loading ? `Submitting...` : `Submit`} />
                </form>
            </Section>
        </Main>
    )
}