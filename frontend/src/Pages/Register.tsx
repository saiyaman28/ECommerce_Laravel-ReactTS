import { React, useState } from 'react'
import { useStateContext } from '../context_provider'
import '../Assets/CSS/Pages/Register.sass'
import { Main, Section, Group, Href, Inputbox, Button } from '../Exporter/Components_Exporter'
import { AddPageTitle, AddClassBody, UseScreenWidth } from '../Exporter/Hooks_Exporter'

export default function RegisterPage() {
    const { register } = useStateContext()
    
    AddPageTitle(`Register`)
    AddClassBody(`Register-Page`)
    const screenwidth = UseScreenWidth()


    const [form, setForm] = useState({
        first_name: ``,
        last_name: ``,
        contact: ``,
        email: ``,
        password: ``,
        password_confirmation: ``,
    })
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

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
            await register(form)
        } 
        catch (err: any) {
            setError(
                err.response?.data?.message ||
                err.response?.data?.errors?.email?.[0] ||
                err.response?.data?.errors?.password?.[0]
            )
        } 
        setLoading(false)
    }

    return (
        <Main>
            <Section Title={`Register`} ID={`register`}>
                <form onSubmit={handleSubmit}>
                    {error && <p>{error}</p>}

                    <Inputbox Type={`text`} Title={`First Name`} Name={`First Name`} Value={form.first_name} OnChange={(e) => setForm({...form, first_name: e.target.value})} Required />
                    <Inputbox Type={`text`} Title={`Last Name`} Name={`Last Name`} Value={form.last_name} OnChange={(e) => setForm({...form, last_name: e.target.value})} Required />
                    <Inputbox Type={`email`} Title={`Email`} Name={`Email`} Value={form.email} OnChange={(e) => setForm({...form, email: e.target.value})} Required />
                    <Inputbox Type={`text`} Title={`Contact`} Name={`Contact`} Value={form.contact} OnChange={(e) => setForm({...form, contact: e.target.value})} Required />
                    <Inputbox Type={`password`} Title={`Password`} Name={`Password`} Value={form.password} OnChange={(e) => setForm({...form, password: e.target.value})} Required />
                    <Inputbox Type={`password`} Title={`Confirm Password`} Name={`Confirm Password`} Value={form.password_confirmation} OnChange={(e) => setForm({...form, password_confirmation: e.target.value})} Required />

                    <Button Submit Disabled={loading} Title={loading ? `Creating account...` : `Register`} />

                    <p>
                        Already have an account? <Href Redirect={`/`} Title={`Login`}/>
                    </p>
                </form>
            </Section>
        </Main>
    )
}