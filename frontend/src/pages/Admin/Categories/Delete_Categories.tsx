// import {React} from 'react'
import {useAddPageTitle, useAddClassBody, useScreenWidth, useDeleteCategory} from '../../../exporter/hooks'
import {Main, Section, Group, Href, Inputbox, Button} from '../../../exporter/components'
import '../../../assets/styles/Pages/Create_Category.sass'

export default function DeleteCategoriesPage() { 
    const {categoryName, setCategoryName, error, loading, handleSubmit} = useDeleteCategory()
    
    useAddPageTitle(`Delete Category`)
    useAddClassBody(`Create-Category-Page`)
    const screenwidth = useScreenWidth()

    return (
        <Main>
            <Section Title={`Delete Category`} ID={`create-category`}>
                {error && <p>{error}</p>}

                <Inputbox Disabled Title={`Category`} Name={`Category`} Value={categoryName} />

                <Button Title={loading ? `Submitting...` : `Submit`} OnClick={handleSubmit} Disabled={loading} />
            </Section>
        </Main>
    )
}