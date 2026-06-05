// import {React} from 'react'
import {useAddPageTitle, useAddClassBody, useScreenWidth, useCreateCategory} from '../../../exporter/hooks'
import {Main, Section, Group, Href, Inputbox, Button} from '../../../exporter/components'
import '../../../assets/styles/Pages/Create_Category.sass'

export default function CreateCategoriesPage() { 
    const {categoryName, setCategoryName, error, loading, handleSubmit} = useCreateCategory()

    useAddPageTitle(`Create Category`)
    useAddClassBody(`Create-Category-Page`)
    const screenwidth = useScreenWidth()

    return (
        <Main>
            <Section Title={`Create Category`} ID={`create-category`}>
                <form onSubmit={handleSubmit}>
                    {error && <p>{error}</p>}

                    <Inputbox Title={`Category`} Name={`Category`} Value={categoryName.category_name} OnChange={(e) => setCategoryName({category_name: e.target.value})} Required />

                    <Button Submit Disabled={loading} Title={loading ? `Submitting...` : `Submit`} />
                </form>
            </Section>
        </Main>
    )
}