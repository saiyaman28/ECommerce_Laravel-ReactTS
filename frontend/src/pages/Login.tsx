// import {React} from 'react'
import {useAddPageTitle, useAddClassBody, useScreenWidth, UseLoginHook} from '../exporter/hooks'
import {Main, Section, Group, Inputbox, Button} from '../exporter/components'
import '../assets/styles/Pages/Login.sass'

export default function LoginPage() {
    const {form, setForm, error, loading, handleSubmit} = UseLoginHook()

    useAddPageTitle(`Login`)
    useAddClassBody(`Login-Page`)
    const screenwidth = useScreenWidth()

    return (
        <Main>
            <Section Title={`Login`} ID={`login`}>
                {error && <p>{error}</p>}

                <Inputbox Type={`email`} Title={`Email`} Name={`Email`} Value={form.email} OnChange={(e) => setForm({ ...form, email: e.target.value })} Required />
                <Inputbox Type={`password`} Title={`Password`} Name={`Password`} Value={form.password} OnChange={(e) => setForm({ ...form, password: e.target.value })} Required />
                
                <Button Title={loading ? `Submitting...` : `Submit`} OnClick={handleSubmit} Disabled={loading} />

                <Button Redirect={`/register`} Title={`Register`} />
                <Button Redirect={`/forgot-password`} Title={`Forgot Password`} />
            </Section>
        </Main>
    )
}