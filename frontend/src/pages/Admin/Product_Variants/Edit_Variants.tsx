// import {React} from 'react'
import {useAddPageTitle, useAddClassBody, useScreenWidth, useUpdateProductVariants} from '../../../exporter/hooks'
import {Main, Section, Group, Href, Inputbox, Button, Selectionbox} from '../../../exporter/components'
import '../../../assets/styles/Pages/Category.sass'

export default function EditProductVariantsPage() {
    const {form, setForm, existingImage, error, loading, filteredSelection, handleSubmit} = useUpdateProductVariants()

    useAddPageTitle(`Edit Variant`)
    useAddClassBody(`Create-Product-Page`)
    const screenwidth = useScreenWidth()

    return (
        <Main>
            <Section Title={`Edit Variant`} ID={`create-product`}>
                {error && <p>{error}</p>}

                {form.image ? 
                    <img src={URL.createObjectURL(form?.image)} width={`150`} />
                    : 
                existingImage ? 
                    <img src={`http://127.0.0.1:8000/storage/${existingImage}`} width={`150`} />
                    : ``
                }
                <Selectionbox Title={`Product`} Name={`product_id`} Value={form.product_id} OnChange={(e) => setForm({ ...form, product_id: Number(e.target.value), })} Options={filteredSelection} Required />
                <Inputbox Title={`Variant`} Name={`Variant`} Value={form.variant_name} OnChange={(e) => setForm({...form, variant_name: e.target.value})} Required />
                <Inputbox Type={`number`} Title={`Price`} Name={`Price`} Value={form.price} OnChange={(e) => setForm({...form, price: e.target.value})} Required />
                <Inputbox Type={`number`} Title={`Stock`} Name={`Stock`} Value={form.stock} OnChange={(e) => setForm({...form, stock: e.target.value})} />
                <Button File Title={`Upload`} Name={`image`} Accept={`image/*`} OnChange={(e) => setForm({ ...form, image: e.target.files?.[0] || null })} />

                <Button Title={loading ? `Submitting...` : `Submit`} OnClick={handleSubmit} Disabled={loading} />
            </Section>
        </Main>
    )
}