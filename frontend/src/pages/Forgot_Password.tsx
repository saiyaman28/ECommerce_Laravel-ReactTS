// import {React} from 'react'
import {useAddPageTitle, useAddClassBody, useScreenWidth, useForgotPassHook} from '../exporter/hooks'
import {Main, Section, Box, Group, Inputbox, Button} from '../exporter/components'
import '../assets/styles/Pages/Forgot_Password.sass'

export default function ForgotPasswordPage() {
    const {email, setEmail, error, loading, handleSubmit} = useForgotPassHook()

    useAddPageTitle(`Forgot Password`)
    useAddClassBody(`Forgot-Password-Page`)
    const screenwidth = useScreenWidth()
    
    return (
        <Main>
            <Section ID={`forgot-password`}>
                <Box Title={<>FORGOT <br/> PASSWORD</>}>
                    {error && <p>{error}</p>}
                    <Inputbox Type={`email`} Title={`Email`} Name={`Email`} Value={email.email} OnChange={(e) => setEmail({email: e.target.value})} Required />
                    <Button Title={loading ? `Submitting...` : `Submit`} OnClick={handleSubmit} Disabled={loading} />
                </Box>
            </Section>
        </Main>
    )
}