import { React, useState } from 'react'
import { useStateContext } from '../context_provider'
import '../Assets/CSS/Pages/Forgot_Password.sass'
import { Main, Section, Group, Href, Inputbox, Button } from '../Exporter/Components_Exporter'
import { AddPageTitle, AddClassBody, UseScreenWidth } from '../Exporter/Hooks_Exporter'

export default function ForgotPasswordPage() {
    AddPageTitle(`Forgot Password`)
    AddClassBody(`Forgot-Password-Page`)
    const screenwidth = UseScreenWidth()
    
    const { forgotPassword } = useStateContext()

    const [email, setEmail] = useState(``)

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        setLoading(true)
        setError(``)

        try {
            await forgotPassword(email)
            alert(`Password reset link has been sent.`)
        } 
        catch (err: any) {
            setError(err.response?.data?.message || `Something went wrong`)
        }
        setLoading(false)
    }

    return (
        <Main>
            <Section Title={`Forgot Password`} ID={`forgot-password`}>
                <form onSubmit={handleSubmit}>
                    {error && <p>{error}</p>}

                    <Inputbox Type={`email`} Title={`Email`} Name={`Email`} Value={email} OnChange={(e) => setEmail(e.target.value)} Required />
                  
                    <Button Submit Disabled={loading} Title={loading ? `Submitting...` : `Submit`} />
                </form>
            </Section>
        </Main>
    )
}