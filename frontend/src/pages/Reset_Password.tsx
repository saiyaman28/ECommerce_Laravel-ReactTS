// import {React} from 'react'
import {useAddPageTitle, useAddClassBody, useScreenWidth, useResetPassHook} from '../exporter/hooks'
import {Main, Section, Group, Inputbox, Button, Box} from '../exporter/components'
import '../assets/styles/Pages/Reset_Password.sass'

export default function ResetPasswordPage() {
    const {form, setForm, error, loading, handleSubmit} = useResetPassHook()

    useAddPageTitle(`Reset Password`)
    useAddClassBody(`Reset-Password-Page`)
    const screenwidth = useScreenWidth()

    return (
        <Main>
            <Section ID={`reset-password`}>
                <Box Title={`RESET PASSWORD`}>
                    {error && <p>{error}</p>}
                    <Group>
                        <Group>
                            <Inputbox Type={`password`} Title={`Password`} Name={`Password`} Value={form.password} OnChange={e => setForm({...form, password: e.target.value})} Required />
                            <Inputbox Type={`password`} Title={`Confirm Password`} Name={`Confirm Password`} Value={form.password_confirmation} OnChange={e => setForm({...form, password_confirmation: e.target.value})} Required />
                        </Group>
                        <Button Title={!loading ? `Submit` : `Submitting...`} Class={`${loading && `loading`}`} OnClick={handleSubmit} Disabled={loading} />
                    </Group>
                </Box>
            </Section>
        </Main>
    )
}