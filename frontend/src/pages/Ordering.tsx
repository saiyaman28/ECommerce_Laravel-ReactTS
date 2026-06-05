// import {React} from 'react'
import {useStateContext} from '../context_provider'
import {useAddPageTitle, useAddClassBody, useScreenWidth, useEnlistProducts} from '../exporter/hooks'
import {Main, Section, Group, Inputbox, Button} from '../exporter/components'
import '../assets/styles/Pages/Create_Product.sass'

export default function OrderingPage() {
    const {user} = useStateContext()
    const {search, setSearch, page, setPage, totalPages, paginatedItems, pages} = useEnlistProducts()

    useAddPageTitle(`Ordering`)
    useAddClassBody(`Create-Product-Page`)
    const screenwidth = useScreenWidth()

    return (
        <Main>
            <Section Title={`ALL PRODUCTS`} ID={`list-product`}>
                <Group>
                    <Inputbox Title={`Search product or variant`} Name={`Search`} Value={search || ``} OnChange={(e) => setSearch(e.target.value)} />
                </Group>
                <Group>
                    {paginatedItems.map((v) => (
                        <Group Row key={v.id}>
                            {v.image && <img src={`http://127.0.0.1:8000/storage/${v.image}`} width={`150`} />}
                            {v?.product_name} - {v?.variant_name} - {v?.category_name} - ₱{v?.price} - Stock: {v?.stock}
                            <Button Title={`View`} Redirect={user?.role === `customer` ? `/customer/product/${v.id}` : user?.role === `admin` ? `/admin/product/${v.id}` : `/product/${v.id}`} />
                        </Group>
                    ))}
                </Group>
                <Group Row>
                    <Button Title={`Prev`} OnClick={() => setPage(Number(page) - 1)} Disabled={Number(page) === 1} />
                        {pages.map((pageNumber) => (
                            <Button key={pageNumber} Title={String(pageNumber)} OnClick={() => setPage(pageNumber)} Disabled={page === pageNumber} />
                        ))}
                    <Button Title={`Next`} OnClick={() => setPage(Number(page) + 1)} Disabled={Number(page) === Number(totalPages)} />
                </Group>
            </Section>
        </Main>
    )
}
