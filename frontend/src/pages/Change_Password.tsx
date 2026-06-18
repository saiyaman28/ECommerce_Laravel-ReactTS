// import {React} from 'react'
import {useStateContext} from '../context_provider'
import {useAddPageTitle, useAddClassBody, useScreenWidth, useUpdatePass} from '../exporter/hooks'
import {Main, Section, Group, Href, Inputbox, Button} from '../exporter/components'
import '../assets/styles/Pages/Change_Password.sass'

export default function ChangePasswordPage() {
    const {user} = useStateContext()
    const {form, setForm, error, loading, handleSubmit} = useUpdatePass()

    useAddPageTitle(user?.id ? `${user?.first_name} ${user?.last_name} - Change Password` : `Change Password`)
    useAddClassBody(`Change-Password-Page`)
    const screenwidth = useScreenWidth()

    return (
        <Main>
            <Section Title={`Change Password`} ID={`change-password`}>
                {error && <p>{error}</p>}

                <Inputbox Type={`password`} Title={`Current Password`} Name={`Current Password`} Value={form.current_password} OnChange={e => setForm({...form, current_password: e.target.value})} Required />
                <Inputbox Type={`password`} Title={`Password`} Name={`Password`} Value={form.password} OnChange={e => setForm({...form, password: e.target.value})} Required />
                <Inputbox Type={`password`} Title={`Confirm Password`} Name={`Confirm Password`} Value={form.password_confirmation} OnChange={e => setForm({...form, password_confirmation: e.target.value})} Required />

                <Button Title={loading ? `Submitting...` : `Submit`} OnClick={handleSubmit} Disabled={loading} />
            </Section>
        </Main>
    )
}