// import {React} from 'react'
import {useAddPageTitle, useAddClassBody, useScreenWidth, useRetrieveProducts} from '../../../exporter/hooks'
import {Main, Section, Group, Href, Inputbox, Button} from '../../../exporter/components'
import '../../../assets/styles/Pages/Product.sass'

export default function ProductsListPage() {
    const {search, setSearch, page, setPage, totalPages, paginatedItems, getVisiblePages} = useRetrieveProducts()
    
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