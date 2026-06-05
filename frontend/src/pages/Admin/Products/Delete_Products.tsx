// import {React} from 'react'
import {useAddPageTitle, useAddClassBody, useScreenWidth, useDeleteProducts} from '../../../exporter/hooks'
import {Main, Section, Group, Href, Inputbox, Button, Selectionbox} from '../../../exporter/components'
import '../../../assets/styles/Pages/Create_Product.sass'

export default function DeleteProductsPage() { 
    const {form, setForm, existingImage, error, loading, filteredSelection, handleSubmit} = useDeleteProducts()

    useAddPageTitle(`Create Product`)
    useAddClassBody(`Create-Product-Page`)
    const screenwidth = useScreenWidth()

    return (
        <Main>
            <Section Title={`Delete Category`} ID={`create-product`}>
                <form onSubmit={handleSubmit}>
                    {error && <p>{error}</p>}

                    {existingImage && 
                        <img src={`http://127.0.0.1:8000/storage/${existingImage}`} width={`150`} />
                    }
                    <Inputbox Disabled Title={`Product`} Name={`Product`} Value={form.product_name} />
                    <Selectionbox Disabled Title={`Category`} Name={`category_id`} Value={form.category_id} />
                    <Inputbox Disabled Title={`Description`} Name={`Description`} Value={form.description} />

                    <Button Submit Disabled={loading} Title={loading ? `Submitting...` : `Submit`} />
                </form>
            </Section>
        </Main>
    )
}