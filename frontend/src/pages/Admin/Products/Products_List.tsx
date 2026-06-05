// import {React} from 'react'
import {useAddPageTitle, useAddClassBody, useScreenWidth, useRetrieveProducts} from '../../../exporter/hooks'
import {Main, Section, Group, Href, Inputbox, Button} from '../../../exporter/components'
import '../../../assets/styles/Pages/Product.sass'

export default function ProductsListPage() {
    const {search, setSearch, page, setPage, totalPages, paginatedItems, pages} = useRetrieveProducts()
    
    useAddPageTitle(`Product`)
    useAddClassBody(`Create-Product-Page`)
    const screenwidth = useScreenWidth()

    return (
        <Main>
            <Section Title={`PRODUCTS`} ID={`list-product`}>
                <Group>
                    <Inputbox Title={`Search product or variant`} Name={`Search`} Value={String(search)} OnChange={(e) => {setSearch(e.target.value); setPage(1)}} />
                </Group>
                <Group>
                    <Button Title={`ADD PRODUCT`} Redirect={`/admin/list/products/create`} />
                    {paginatedItems.map((p) => (
                        <Group Row key={p.id}>
                            {p.image && <img src={`http://127.0.0.1:8000/storage/${p.image}`} width={`150`} />}
                            {p.id} - {p.product_name} - {p.category_name} - {p.description ? p.description : `No description`}
                            <Button Title={`Edit`} Redirect={`/admin/list/products/${p.id}/edit`} />
                            <Button Title={`Delete`} Redirect={`/admin/list/products/${p.id}/delete`} />
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