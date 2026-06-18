// import {React} from 'react'
import {useStateContext} from '../context_provider'
import {useAddPageTitle, useAddClassBody, useScreenWidth, useEnlistCart} from '../exporter/hooks'
import {Main, Section, Group, Inputbox, Button, QRCode} from '../exporter/components'
import '../assets/styles/Pages/Create_Product.sass'

export default function CartPage() {
    const {user} = useStateContext()
    const {filteredItems, removeItem, updateQty, total, handleCheckout, paymentReference, handleReceiptUpload} = useEnlistCart()

    useAddPageTitle(`Cart`)
    useAddClassBody(`Create-Product-Page`)
    const screenwidth = useScreenWidth()

    return (
        <Main>
            <Section Title={`CART`} ID={`list-product`}>
                <Group>
                    {filteredItems.map((i) => (
                        <Group Row key={i?.id}>
                            {i?.product_name} - {i?.variant_name} - ₱{i?.price} - Stock: {i?.stock}
                            <Inputbox Type={`number`} Value={i?.quantity} Min={1} Max={Number(i?.stock)} OnChange={(e) => updateQty(Number(i?.product_variant_id), Number(e.target.value))} />
                            <Button Title={`Remove`} OnClick={() => removeItem(Number(i?.product_variant_id))} />
                        </Group>
                    ))}
                    <Group Row>
                        Total: ₱{total}
                        {paymentReference && `Payment Reference No: ${paymentReference}`}
                    </Group>
                    <QRCode BaseUrl={`00020101021127830012com.p2pqrpay0111GXCHPHM2XXX02089996440303152170200000006560417DWQM4TK3JDO4ONKO15204601653036085802PH5913ER**K PA*L D.6005Sauyo610412346304E3A9`} />
                    <QRCode BaseUrl={`00020101021227610012com.p2pqrpay0111BOPIPHMMXXX02089996440304140000423920419352046016530360854075000.005802PH5909kaldagers6011Makati City630423E8`} />
                    <Group Row>
                        <Button File Title={`Upload Receipt`} OnChange={(e) => handleReceiptUpload(e.target.files?.[0])} />
                        <Button Title={`Checkout`} OnClick={handleCheckout} Disabled={!filteredItems.length} />
                    </Group>
                </Group>
            </Section>
        </Main>
    )
}