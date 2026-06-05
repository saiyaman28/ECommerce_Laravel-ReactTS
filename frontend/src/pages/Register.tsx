// import {React} from 'react'
import {useAddPageTitle, useAddClassBody, useScreenWidth, UseRegisterHook} from '../exporter/hooks'
import {Main, Section, Group, Inputbox, Button, Href} from '../exporter/components'
import '../assets/styles/Pages/Register.sass'

export default function RegisterPage() {
    const {form, setForm, error, loading, handleSubmit} = UseRegisterHook()

    useAddPageTitle(`Register`)
    useAddClassBody(`Register-Page`)
    const screenwidth = useScreenWidth()

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

                    <Button Submit Disabled={loading} Title={loading ? `Submitting...` : `Submit`} />

                    <p>Already have an account? <Href Redirect={`/`} Title={`Login`}/></p>
                </form>
            </Section>
        </Main>
    )
}