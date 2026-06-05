// import {React} from 'react'
import {useStateContext} from '../context_provider'
import {useAddPageTitle, useAddClassBody, useScreenWidth, useRetrieveOrders} from '../exporter/hooks'
import {Main, Section, Group, Inputbox, Button} from '../exporter/components'
import '../assets/styles/Pages/Create_Product.sass'

export default function OrdersListPage() {
    const {user} = useStateContext()
    const {search, setSearch, page, setPage, totalPages, paginatedItems, pages} = useRetrieveOrders()

    useAddPageTitle(`Orders`)
    useAddClassBody(`Create-Product-Page`)
    const screenwidth = useScreenWidth()

    return (
        <Main>
            <Section Title={`ORDERS`} ID={`list-product`}>
                <Group>
                    <Inputbox Title={`Search product or variant`} Name={`Search`} Value={String(search)} OnChange={(e) => {setSearch(e.target.value); setPage(1)}} />
                </Group>
                <Group>
                    {user?.role === `customer` && 
                        paginatedItems.filter((o) => o.customer_id === user?.id).map((o) => (
                        <Group Row key={o.id}>
                            {o.id} - {o.total_price} - {o.status} - {o.created_at} - {o.updated_at}
                            <Button Title={`View`} Redirect={`/customer/list/orders/${o.id}`} />
                        </Group>
                    ))}
                    {user?.role === `admin` && 
                        paginatedItems.map((o) => (
                        <Group Row key={o.id}>
                            {o.id} - {o.first_name} {o.last_name} - {o.contact} - {o.email} - {o.total_price} - {o.status} - {o.created_at} - {o.updated_at}
                            <Button Title={`Edit`} Redirect={`/admin/list/orders/${o.id}/edit`} />
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