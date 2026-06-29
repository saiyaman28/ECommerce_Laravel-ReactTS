// import {React} from 'react'
import {useStateContext} from '../context_provider'
import {useAddPageTitle, useAddClassBody, useScreenWidth, useEnlistProducts} from '../exporter/hooks'
import {Main, Section, Group, Inputbox, Button, Card, Box, Href} from '../exporter/components'
import '../assets/styles/Pages/Create_Product.sass'

export default function OrderingPage() {
    const {user} = useStateContext()
    const {page, setPage, totalPages, paginatedItems, getVisiblePages} = useEnlistProducts()

    useAddPageTitle(`Ordering`)
    useAddClassBody(`Create-Product-Page`)
    const screenwidth = useScreenWidth()

    return (
        <Main>
            <Section ID={`list-product`}>
                <Group Wrap>
                    {paginatedItems.map((v) => (
                        <Href Object={
                            <Card Image={v.image && `http://127.0.0.1:8000/storage/${v.image}`} ProductTitle={v?.product_name} VariantTitle={v?.variant_name} Price={`₱${v?.price}`} />} 
                            Redirect={user?.role === `customer` ? `/customer/product/${v.id}` : user?.role === `admin` ? `/admin/product/${v.id}` : `/product/${v.id}`} 
                        />
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
