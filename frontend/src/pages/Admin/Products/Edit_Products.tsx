// import {React} from 'react'
import {useAddPageTitle, useAddClassBody, useScreenWidth, useUpdateProducts} from '../../../exporter/hooks'
import {Main, Section, Group, Href, Inputbox, Button, Selectionbox} from '../../../exporter/components'
import '../../../assets/styles/Pages/Create_Product.sass'

export default function EditProductsPage() {
    const {form, setForm, existingImage, error, loading, filteredSelection, handleSubmit} = useUpdateProducts()

    useAddPageTitle(`Edit Product`)
    useAddClassBody(`Create-Product-Page`)
    const screenwidth = useScreenWidth()

    return (
        <Main>
            <Section Title={`Edit Product`} ID={`create-product`}>
                <form onSubmit={handleSubmit}>
                    {error && <p>{error}</p>}
                    
                    {form.image ? 
                        <img src={URL.createObjectURL(form?.image)} width={`150`} />
                        : 
                        existingImage ? 
                        <img src={`http://127.0.0.1:8000/storage/${existingImage}`} width={`150`} />
                        : ``
                    }
                    <Inputbox Title={`Product`} Name={`Product`} Value={form.product_name} OnChange={(e) => setForm({...form, product_name: e.target.value})} Required />
                    <Selectionbox Title={`Category`} Name={`category_id`} Value={form.category_id} OnChange={(e) => setForm({ ...form, category_id: Number(e.target.value)})} Options={filteredSelection} Required />
                    <Inputbox Title={`Description`} Name={`Description`} Value={form.description} OnChange={(e) => setForm({...form, description: e.target.value})} />
                    <Button File Title={`Upload`} Name={`image`} Accept={`image/*`} OnChange={(e) => setForm({ ...form, image: e.target.files?.[0] || null })} />
                    
                    <Button Submit Disabled={loading} Title={loading ? `Submitting...` : `Submit`} />
                </form>
            </Section>
        </Main>
    )
}