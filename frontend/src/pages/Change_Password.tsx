// import {React} from 'react'
import {useStateContext} from '../context_provider'
import {useAddPageTitle, useAddClassBody, useScreenWidth, useUpdatePass} from '../exporter/hooks'
import {Main, Section, Group, Box, Inputbox, Button} from '../exporter/components'
import '../assets/styles/Pages/Change_Password.sass'

export default function ChangePasswordPage() {
    const {user} = useStateContext()
    const {form, setForm, error, loading, handleSubmit} = useUpdatePass()

    useAddPageTitle(user?.id ? `${user?.first_name} ${user?.last_name} - Change Password` : `Change Password`)
    useAddClassBody(`Change-Password-Page`)
    const screenwidth = useScreenWidth()

    return (
        <Main>
            <Section ID={`change-password`}>
                <Box Title={<>CHANGE <br/> PASSWORD</>}>
                    {error && <p>{error}</p>}
                    <Group>
                        <Group>
                            <Inputbox Type={`password`} Title={`Current Password`} Name={`Current Password`} Value={form.current_password} OnChange={e => setForm({...form, current_password: e.target.value})} Required />
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