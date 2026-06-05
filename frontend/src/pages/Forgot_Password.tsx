// import {React} from 'react'
import {useAddPageTitle, useAddClassBody, useScreenWidth, useForgotPassHook} from '../exporter/hooks'
import {Main, Section, Group, Inputbox, Button} from '../exporter/components'
import '../assets/styles/Pages/Forgot_Password.sass'

export default function ForgotPasswordPage() {
    const {email, setEmail, error, loading, handleSubmit} = useForgotPassHook()

    useAddPageTitle(`Forgot Password`)
    useAddClassBody(`Forgot-Password-Page`)
    const screenwidth = useScreenWidth()
    
    return (
        <Main>
            <Section Title={`Forgot Password`} ID={`forgot-password`}>
                <form onSubmit={handleSubmit}>
                    {error && <p>{error}</p>}

                    <Inputbox Type={`email`} Title={`Email`} Name={`Email`} Value={email.email} OnChange={(e) => setEmail({email: e.target.value})} Required />
                  
                    <Button Submit Disabled={loading} Title={loading ? `Submitting...` : `Submit`} />
                </form>
            </Section>
        </Main>
    )
}