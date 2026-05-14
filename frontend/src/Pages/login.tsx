import { React, useState } from 'react'
import { useStateContext } from '../context_provider'
import '../Assets/CSS/Pages/Login.sass'
import { Main, Section, Group, Href, Inputbox, Button } from '../Exporter/Components_Exporter'
import { AddPageTitle, AddClassBody, UseScreenWidth } from '../Exporter/Hooks_Exporter'

export default function LoginPage() {
    const { login } = useStateContext()
    
    AddPageTitle(`Login`)
    AddClassBody(`Login-Page`)
    const screenwidth = UseScreenWidth()
    
    const [form, setForm] = useState({
        email: ``,
        password: ``,
    })
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        setLoading(true)

        try {
            await login(form)
        } 
        catch (err: any) {
            setError(err.response?.data?.message || `An error occurred while logging in.`)
        }
        setLoading(false)
    }

    return (
        <Main>
            <Section Title={`Login`} ID={`login`}>
                <form onSubmit={handleSubmit}>
                    {error && <p>{error}</p>}

                    <Inputbox Type={`email`} Title={`Email`} Name={`Email`} Value={form.email} OnChange={(e) => setForm({...form, email: e.target.value})} Required />
                    <Inputbox Type={`password`} Title={`Password`} Name={`Password`} Value={form.password} OnChange={(e) => setForm({...form, password: e.target.value})} Required />

                    <Button Submit Disabled={loading} Title={loading ? `Logging in...` : `Submit`} />
                    <Button Redirect={`/register`} Title={`Register`} />
                    <Button Redirect={`/forgot-password`} Title={`Forgot Password`} />
                </form>
            </Section>
        </Main>
    )
}


