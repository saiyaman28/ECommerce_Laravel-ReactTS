// import {React} from 'react'
import { useAddPageTitle, useAddClassBody, useScreenWidth, useRetrieveCategories } from '../../../exporter/hooks'
import { Main, Section, Group, Href, Inputbox, Button } from '../../../exporter/components'
import '../../../assets/styles/Pages/Create_Product.sass'

export default function CategoriesListPage() {
    const {search, setSearch, page, setPage, totalPages, paginatedItems, getVisiblePages} = useRetrieveCategories()

    useAddPageTitle(`Category`)
    useAddClassBody(`Create-Product-Page`)
    const screenwidth = useScreenWidth()

    return (
        <Main>
            <Section Title={`CATEGORIES`} ID={`list-product`}>
                <Group>
                    <Inputbox Title={`Search product or variant`} Name={`Search`} Value={String(search)} OnChange={(e) => { setSearch(e.target.value); setPage(1) }} />
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
                    <Group>
                        <Button Title={`Prev`} OnClick={() => setPage(Number(page) - 1)} Disabled={Number(page) === 1} />
                        {getVisiblePages(Number(page), Number(totalPages)).map((p, idx) => p === `...`
                            ? <span key={idx}>{p}</span>
                            : <Button key={idx} Title={String(p)} OnClick={() => setPage(Number(p))} Disabled={Number(page) === Number(p)} />
                        )}
                        <Button Title={`Next`} OnClick={() => setPage(Number(page) + 1)} Disabled={Number(page) === Number(totalPages)} />
                    </Group>
                }
            </Section>
        </Main>
    )
}