// import { React } from 'react'
import { useStateContext } from '../context_provider'
import { useAddPageTitle, useAddClassBody, useScreenWidth, useUpdateOrders } from '../exporter/hooks'
import { Main, Section, Group, Href, Inputbox, Button, Selectionbox, QRCode } from '../exporter/components'
import '../assets/styles/Pages/Create_Product.sass'

export default function ViewOrderPage() {
    const { user } = useStateContext()
    const { form, setForm, error, loading, filteredCustomer, filteredItems, filteredSelection, handleSubmit, handleReceiptUpload } = useUpdateOrders()

    useAddPageTitle(`Edit Orders`)
    useAddClassBody(`Create-Product-Page`)
    const screenwidth = useScreenWidth()

    return (
        <Main>
            <Section Title={`View Order`} ID={`list-product`}>
                <Group>
                    {error && <p>{error}</p>}

                    <Inputbox Disabled Title={`Name`} Name={`Name`} Value={filteredCustomer && `${filteredCustomer?.first_name} ${filteredCustomer?.last_name}`} />
                    <Inputbox Disabled Title={`Email`} Name={`Email`} Value={filteredCustomer && `${filteredCustomer.email}`} />
                    <Selectionbox Disabled={user?.role === `customer`} Title={`Status`} Name={`Status`} Value={form?.status} OnChange={(e) => setForm({ ...form, status: e.target.value })} Options={filteredSelection} Required={user?.role === `admin`} />

                    {filteredItems.map((i) => (
                        <Group Row key={i.id}>
                            {i?.product_name} - {i?.variant_name} - Quantity: {i.quantity} - {i.total_price}
                        </Group>
                    ))}
                    <Group>
                        TOTAL: {form.total_price ? form.total_price : `0.00`} <br />
                        REFERENCE NO: {form.payment_reference_number ? form.payment_reference_number : `UNPAID`}
                    </Group>
                    {form.status === `Pending` &&
                        <>
                            <QRCode BaseUrl={`00020101021127830012com.p2pqrpay0111GXCHPHM2XXX02089996440303152170200000006560417DWQM4TK3JDO4ONKO15204601653036085802PH5913ER**K PA*L D.6005Sauyo610412346304E3A9`} />
                            <QRCode BaseUrl={`00020101021227610012com.p2pqrpay0111BOPIPHMMXXX02089996440304140000423920419352046016530360854075000.005802PH5909kaldagers6011Makati City630423E8`} />
                        </>
                    }
                    {(form.status === `Pending` || user?.role === `admin`) &&
                        <Group Row>
                            {form.status === `Pending` &&
                                <Button File Title={`Upload Receipt`} OnChange={(e) => {const file = e.target.files?.[0]; if (file) handleReceiptUpload(file)}} />
                            }
                            <Button Title={loading ? `Submitting...` : `Submit`} OnClick={handleSubmit} Disabled={loading} />
                        </Group>
                    }
                </Group>
            </Section>
        </Main>
    )
}