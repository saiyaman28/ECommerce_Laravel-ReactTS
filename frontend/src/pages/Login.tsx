// import {React} from 'react'
import {useAddPageTitle, useAddClassBody, useScreenWidth, UseLoginHook} from '../exporter/hooks'
import {Main, Section, Box, Group, Inputbox, Button, Href} from '../exporter/components'
import '../assets/styles/Pages/Login.sass'

export default function LoginPage() {
    const {form, setForm, error, loading, handleSubmit} = UseLoginHook()

    useAddPageTitle(`Login`)
    useAddClassBody(`Login-Page`)
    const screenwidth = useScreenWidth()

    return (
        <Main>
            <Section ID={`login`}>
                <Box Title={`LOGIN`}>
                    {error && <p>{error}</p>}
                    <Group>
                        <Group>
                            <Inputbox Type={`email`} Title={`Email`} Name={`Email`} Value={form.email} OnChange={(e) => setForm({ ...form, email: e.target.value })} Required />
                            <Inputbox Type={`password`} Title={`Password`} Name={`Password`} Value={form.password} OnChange={(e) => setForm({ ...form, password: e.target.value })} Required />
                            <Href Title={`Forgot Password?`} Redirect={`/forgot-password`} />
                        </Group>
                        <Button Title={!loading ? `Submit` : `Submitting...`} Class={`${loading && `loading`}`} OnClick={handleSubmit} Disabled={loading} />
                        <p>Don't have an account? <Href Redirect={`/register`} Title={`Sign up`} /></p>
                    </Group>
                </Box>
            </Section>
        </Main>
    )
}