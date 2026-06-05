// import { React } from 'react'
import {useStateContext} from '../context_provider'
import {useAddPageTitle, useAddClassBody, useScreenWidth, useUpdateOrders} from '../exporter/hooks'
import {Main, Section, Group, Href, Inputbox, Button, Selectionbox} from '../exporter/components'
import '../assets/styles/Pages/Create_Product.sass'

export default function ViewOrderPage() {
    const {user} = useStateContext()
    const {form, setForm, error, loading, filteredCustomer, filteredItems, filteredSelection, handleSubmit} = useUpdateOrders()

    useAddPageTitle(`Edit Orders`)
    useAddClassBody(`Create-Product-Page`)
    const screenwidth = useScreenWidth()

    return (
        <Main>
            <Section Title={`View Order`} ID={`create-product`}>
                <form onSubmit={handleSubmit}>
                    {error && <p>{error}</p>}

                    <Inputbox Disabled Title={`Name`} Name={`Name`} Value={filteredCustomer && `${filteredCustomer?.first_name} ${filteredCustomer?.last_name}`} />
                    <Inputbox Disabled Title={`Email`} Name={`Email`} Value={filteredCustomer && `${filteredCustomer.email}`} />
                    <Selectionbox Disabled={user?.role === `customer`} Title="Status" Name="Status" Value={form?.status} OnChange={(e) => setForm({ ...form, status: e.target.value})} Options={filteredSelection} Required={user?.role === `admin`} />

                    <Group>
                        {filteredItems.map((i) => (
                            <Group Row key={i.id}>
                                {i?.product_name} - {i?.variant_name} - Quantity: {i.quantity} - {i.total_price}
                            </Group>
                        ))}
                        <Group>
                            TOTAL: {form.total_price}
                        </Group>
                    </Group>

                    {user?.role === `admin` &&
                        <Button Submit Disabled={loading} Title={loading ? `Submitting...` : `Submit`} />
                    }
                </form>
            </Section>
        </Main>
    )
}