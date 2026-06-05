// import {React} from 'react'
import {useAddPageTitle, useAddClassBody, useScreenWidth, useCreateProductVariants} from '../../../exporter/hooks'
import {Main, Section, Group, Href, Inputbox, Button, Selectionbox} from '../../../exporter/components'
import '../../../assets/styles/Pages/Category.sass'

export default function CreateProductVariantsPage() { 
    const {form, setForm, error, loading, filteredSelection, handleSubmit} = useCreateProductVariants()

    useAddPageTitle(`Create Variant`)
    useAddClassBody(`Create-Product-Page`)
    const screenwidth = useScreenWidth()

    return (
        <Main>
            <Section Title={`Create Product`} ID={`create-product`}>
                <form onSubmit={handleSubmit}>
                    {error && <p>{error}</p>}

                    {form.image &&
                        <img src={URL.createObjectURL(form?.image)} width={`150`} />
                    }
                    <Selectionbox Title={`Product`} Name={`product_id`} Value={form.product_id} OnChange={(e) => setForm({ ...form, product_id: Number(e.target.value), })} Options={filteredSelection} Required />
                    <Inputbox Title={`Variant`} Name={`Variant`} Value={form.variant_name} OnChange={(e) => setForm({...form, variant_name: e.target.value})} Required />
                    <Inputbox Title={`Price`} Name={`Price`} Value={form.price} OnChange={(e) => setForm({...form, price: Number(e.target.value)})} Required />
                    <Inputbox Title={`Stock`} Name={`Stock`} Value={form.stock} OnChange={(e) => setForm({...form, stock: Number(e.target.value)})} />
                    <Button File Title={`Upload`} Name={`image`} Accept={`image/*`} OnChange={(e) => setForm({ ...form, image: e.target.files?.[0] || null })} />

                    <Button Submit Disabled={loading} Title={loading ? `Submitting...` : `Submit`} />
                </form>
            </Section>
        </Main>
    )
}