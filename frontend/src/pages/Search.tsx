import {useStateContext} from '../context_provider'
import {useSearchParams} from 'react-router-dom'
import {Main, Section, Group, Button} from '../exporter/components'
import {useAddPageTitle, useAddClassBody, useScreenWidth, useEnlistProducts} from '../exporter/hooks'
import '../assets/styles/Pages/Create_Product.sass'

export default function SearchPage() {
    const {user} = useStateContext()
    const [params] = useSearchParams()

    const keyword = params.get('q')

    const {paginatedItems, page, setPage, getVisiblePages, totalPages} = useEnlistProducts(keyword)

    useAddPageTitle(`Ordering`)
    useAddClassBody(`Create-Product-Page`)
    const screenwidth = useScreenWidth()

    return (
        <Main>
            <Section Title={`SEARCH RESULTS`} ID={`list-product`}>
                <Group>
                    {paginatedItems.length ? (
                        paginatedItems.map((v) => (
                            <Group Row key={v.id}>
                                {v.image && <img src={`http://127.0.0.1:8000/storage/${v.image}`} width={`150`} />}
                                {v?.product_name} - {v?.variant_name} - {v?.category_name} - ₱{v?.price} - Stock: {v?.stock}
                                <Button Title={`View`} Redirect={user?.role === `customer` ? `/customer/product/${v.id}` : user?.role === `admin` ? `/admin/product/${v.id}` : `/product/${v.id}`} />
                            </Group>
                        )))
                        :
                        <>
                            <h2>No products found.</h2>
                            <p>Try another keyword.</p>
                        </>
                    }
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