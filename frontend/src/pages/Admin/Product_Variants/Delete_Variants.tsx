// import {React} from 'react'
import {useAddPageTitle, useAddClassBody, useScreenWidth, useDeleteProductVariants} from '../../../exporter/hooks'
import {Main, Section, Group, Href, Inputbox, Button, Selectionbox} from '../../../exporter/components'
import '../../../assets/styles/Pages/Category.sass'

export default function DeleteProductVariantsPage() { 
    const {form, setForm, existingImage, error, loading, filteredSelection, handleSubmit} = useDeleteProductVariants()

    useAddPageTitle(`Delete Variant`)
    useAddClassBody(`Create-Product-Page`)
    const screenwidth = useScreenWidth()
    
    return (
        <Main>
            <Section Title={`Delete Category`} ID={`create-product`}>
                {error && <p>{error}</p>}
                    
                {existingImage && <img src={`http://127.0.0.1:8000/storage/${existingImage}`} width={`150`} />}
                <Selectionbox Disabled Title={`Product`} Name={`product_id`} Value={form.product_id} Options={filteredSelection} Required />
                <Inputbox Disabled Title={`Variant`} Name={`Variant`} Value={form.variant_name} />
                <Inputbox Disabled Title={`Price`} Name={`Price`} Value={form.price} />
                <Inputbox Disabled Title={`Stock`} Name={`Stock`} Value={form.stock} />

                <Button Title={loading ? `Submitting...` : `Submit`} OnClick={handleSubmit} Disabled={loading} />
            </Section>
        </Main>
    )
}