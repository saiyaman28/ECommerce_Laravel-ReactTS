// import {React} from 'react'
import {useAddPageTitle, useAddClassBody, useScreenWidth, useResetPassHook} from '../exporter/hooks'
import {Main, Section, Group, Inputbox, Button} from '../exporter/components'
import '../assets/styles/Pages/Reset_Password.sass'

export default function ResetPasswordPage() {
    const {form, setForm, error, loading, handleSubmit} = useResetPassHook()

    useAddPageTitle(`Reset Password`)
    useAddClassBody(`Reset-Password-Page`)
    const screenwidth = useScreenWidth()

    return (
        <Main>
            <Section Title={`Reset Password`} ID={`reset-password`}>
                {error && <p>{error}</p>}

                <Inputbox Type={`password`} Title={`Password`} Name={`Password`} Value={form.password} OnChange={e => setForm({...form, password: e.target.value})} Required />
                <Inputbox Type={`password`} Title={`Confirm Password`} Name={`Confirm Password`} Value={form.password_confirmation} OnChange={e => setForm({...form, password_confirmation: e.target.value})} Required />

                <Button Title={loading ? `Submitting...` : `Submit`} OnClick={handleSubmit} Disabled={loading} />
            </Section>
        </Main>
    )
}