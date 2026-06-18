// import {React} from 'react'
import {useStateContext} from '../context_provider'
import {useAddPageTitle, useAddClassBody, useScreenWidth, useUpdateProfile} from '../exporter/hooks'
import {Main, Section, Group, Href, Inputbox, Button} from '../exporter/components'
import '../assets/styles/Pages/Edit_Profile.sass'

export default function EditProfilePage() {
    const {user} = useStateContext()
    const {form, setForm, error, loading, handleSubmit} = useUpdateProfile()

    useAddPageTitle(user?.id ? `${user?.first_name} ${user?.last_name} - Edit Profile` : `Edit Profile`)
    useAddClassBody(`Edit-Profile-Page`)
    const screenwidth = useScreenWidth()

    return (
        <Main>
            <Section Title={`Edit Profile`} ID={`edit-profile`}>
                {error && <p>{error}</p>}

                <Inputbox Type={`text`} Title={`First Name`} Name={`First Name`} Value={form.first_name} OnChange={(e) => setForm({ ...form, first_name: e.target.value })} Required />
                <Inputbox Type={`text`} Title={`Last Name`} Name={`Last Name`} Value={form.last_name} OnChange={(e) => setForm({ ...form, last_name: e.target.value })} Required />
                <Inputbox Type={`email`} Title={`Email`} Name={`Email`} Value={form.email} OnChange={(e) => setForm({ ...form, email: e.target.value })} Required />
                <Inputbox Type={`text`} Title={`Contact`} Name={`Contact`} Value={form.contact} OnChange={(e) => setForm({ ...form, contact: e.target.value })} Required />

                <Button Title={loading ? `Submitting...` : `Submit`} OnClick={handleSubmit} Disabled={loading} />
            </Section>
        </Main>
    )
}
