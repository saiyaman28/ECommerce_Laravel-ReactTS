// import {React} from 'react'
import {useAddPageTitle, useAddClassBody, useScreenWidth, useRetrieveProductVariants} from '../../../exporter/hooks'
import {Main, Section, Group, Href, Inputbox, Button} from '../../../exporter/components'
import '../../../assets/styles/Pages/Category.sass'

export default function ProductVariantsListPage() {
    const {search, setSearch, page, setPage, totalPages, paginatedItems, pages} = useRetrieveProductVariants()

    useAddPageTitle(`Product Variant`)
    useAddClassBody(`Create-Product-Page`)
    const screenwidth = useScreenWidth()

    return (
        <Main>
            <Section Title={`PRODUCT VARIANTS`} ID={`list-product`}>
                <Group>
                    <Inputbox Title={`Search product or variant`} Name={`Search`} Value={String(search)} OnChange={(e) => {setSearch(e.target.value); setPage(1)}} />
                </Group>
                <Group>
                    <Button Title={`ADD VARIANT`} Redirect={`/admin/list/products/variants/create`} />
                    {paginatedItems.map((v) => (
                        <Group Row key={v.id}>
                            {v.image && <img src={`http://127.0.0.1:8000/storage/${v.image}`} width={`150`} />}
                            {v.id} - {v.product_name} - {v.variant_name} - {v.category_name} - {v.price} - Stock: {v.stock}
                            <Button Title={`Edit`} Redirect={`/admin/list/products/variants/${v.id}/edit`} />
                            <Button Title={`Delete`} Redirect={`/admin/list/products/variants/${v.id}/delete`} />
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