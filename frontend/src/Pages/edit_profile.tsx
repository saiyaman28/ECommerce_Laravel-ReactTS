import { useEffect, useState } from "react"
import { useStateContext } from "../context_provider"
import '../Assets/CSS/Pages/Edit_Profile.sass'
import { Main, Section, Group, Href, Inputbox, Button } from '../Exporter/Components_Exporter'
import { AddPageTitle, AddClassBody, UseScreenWidth } from '../Exporter/Hooks_Exporter'

export default function EditProfilePage() {
    const { user, updateProfile } = useStateContext()

    AddPageTitle(`${user?.first_name} ${user?.last_name} - Edit Profile`)
    AddClassBody(`Edit-Profile-Page`)
    const screenwidth = UseScreenWidth()

    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        contact: "",
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    // const [message, setMessage] = useState<string | null>(null)

    useEffect(() => {
        if (user) {
            setForm({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                contact: (user as any).contact || "",
            })
        }
    }, [user])


    const handleSubmit = async (e: any) => {
        e.preventDefault()

        setLoading(true)
        setError(null)

        try {
            await updateProfile(form)
            alert(`Profile updated successfully`)
        } 
        catch (err: any) {
            setError(err.response?.data?.message || "Update failed")
        } 
        setLoading(false)
    }

    return (
        <Main>
            <Section Title={`Edit Profile`} ID={`edit-profile`}>
                <form onSubmit={handleSubmit}>
                    {error && <p>{error}</p>}

                    <Inputbox Type={`text`} Title={`First Name`} Name={`First Name`} Value={form.first_name} OnChange={(e) => setForm({ ...form, first_name: e.target.value })} Required />
                    <Inputbox Type={`text`} Title={`Last Name`} Name={`Last Name`} Value={form.last_name} OnChange={(e) => setForm({ ...form, last_name: e.target.value })} Required />
                    <Inputbox Type={`email`} Title={`Email`} Name={`Email`} Value={form.email} OnChange={(e) => setForm({ ...form, email: e.target.value })} Required />
                    <Inputbox Type={`text`} Title={`Contact`} Name={`Contact`} Value={form.contact} OnChange={(e) => setForm({ ...form, contact: e.target.value })} Required />

                    <Button Submit Disabled={loading} Title={loading ? `Saving...` : `Save Changes`} />
                </form>
            </Section>
        </Main>
    )
}
