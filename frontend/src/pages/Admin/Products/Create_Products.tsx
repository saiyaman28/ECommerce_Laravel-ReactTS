// import {React} from 'react'
import {useAddPageTitle, useAddClassBody, useScreenWidth, useCreateProducts} from '../../../exporter/hooks'
import {Main, Section, Group, Href, Inputbox, Button, Selectionbox} from '../../../exporter/components'
import '../../../assets/styles/Pages/Create_Product.sass'

export default function CreateProductsPage() { 
    const {form, setForm, filteredSelection, error, loading, handleSubmit} = useCreateProducts()

    useAddPageTitle(`Create Product`)
    useAddClassBody(`Create-Product-Page`)
    const screenwidth = useScreenWidth()

    return (
        <Main>
            <Section Title={`Create Product`} ID={`create-product`}>
                {error && <p>{error}</p>}
                    
                {form.image && <img src={URL.createObjectURL(form?.image)} width={`150`} /> }
                <Inputbox Title={`Product`} Name={`Product`} Value={form.product_name} OnChange={(e) => setForm({...form, product_name: e.target.value})} Required />
                <Selectionbox Title={`Category`} Name={`category_id`} Value={form.category_id} OnChange={(e) => setForm({ ...form, category_id: Number(e.target.value)})} Options={filteredSelection} Required/>
                <Inputbox Title={`Description`} Name={`Description`} Value={form.description} OnChange={(e) => setForm({...form, description: e.target.value})} />
                <Button File Title={`Upload`} Name={`image`} Accept={`image/*`} OnChange={(e) => setForm({ ...form, image: e.target.files?.[0] || null })} />

                <Button Title={loading ? `Submitting...` : `Submit`} OnClick={handleSubmit} Disabled={loading} />
            </Section>
        </Main>
    )
}