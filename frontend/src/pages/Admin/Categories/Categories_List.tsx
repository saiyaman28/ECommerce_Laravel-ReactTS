// import {React} from 'react'
import {useAddPageTitle, useAddClassBody, useScreenWidth, useRetrieveCategories} from '../../../exporter/hooks'
import {Main, Section, Group, Href, Inputbox, Button} from '../../../exporter/components'
import '../../../assets/styles/Pages/Create_Product.sass'

export default function CategoriesListPage() {
    const {search, setSearch, page, setPage, totalPages, paginatedItems, pages} = useRetrieveCategories()

    useAddPageTitle(`Category`)
    useAddClassBody(`Create-Product-Page`)
    const screenwidth = useScreenWidth()

    return (
        <Main>
            <Section Title={`CATEGORIES`} ID={`list-product`}>
                <Group>
                    <Inputbox Title={`Search product or variant`} Name={`Search`} Value={String(search)} OnChange={(e) => {setSearch(e.target.value); setPage(1)}} />
                </Group>
                <Group>
                    <Button Title={`ADD CATEGORY`} Redirect={`/admin/list/categories/create`} />
                    {paginatedItems.map((c) => (
                        <Group Row key={c.id}>
                            {c.id} - {c.category_name}
                            <Button Title={`Edit`} Redirect={`/admin/list/categories/${c.id}/edit`} />
                            <Button Title={`Delete`} Redirect={`/admin/list/categories/${c.id}/delete`} />
                        </Group>
                    ))}
                </Group>
                {Number(totalPages) > 1 &&
                    <Group Row>
                        <Button Title={`Prev`} OnClick={() => setPage(Number(page) - 1)} Disabled={Number(page) === 1} />
                            {pages.map((pageNumber) => (
                                <Button key={pageNumber} Title={String(pageNumber)} OnClick={() => setPage(pageNumber)} Disabled={page === pageNumber} />
                            ))}
                        <Button Title={`Next`} OnClick={() => setPage(Number(page) + 1)} Disabled={Number(page) === Number(totalPages)} />
                    </Group>
                }
            </Section>
        </Main>
    )
}