// import {React} from 'react'
import {useStateContext} from '../context_provider'
import {useAddPageTitle, useAddClassBody, useScreenWidth, useEnlistCart} from '../exporter/hooks'
import {Main, Section, Group, Inputbox, Button} from '../exporter/components'
import '../assets/styles/Pages/Create_Product.sass'

export default function CartPage() {
    const {user} = useStateContext()
    const {products, variants, cart, getStock, removeItem, updateQty, total, handleCheckout} = useEnlistCart()

    useAddPageTitle(`Cart`)
    useAddClassBody(`Create-Product-Page`)
    const screenwidth = useScreenWidth()

    return (
        <Main>
            <Section Title={`CART`} ID={`list-product`}>
                <Group>
                    {cart.map((item) => {
                        const variant = variants.find((v) => Number(v.id) === Number(item.product_variant_id))
                        if (!variant) return null
                        const product = products.find( (p) => Number(p.id) === Number(variant.product_id))
                        const stock = getStock(Number(variant.id))

                        return (
                            <Group Row key={variant.id}>
                                {product?.product_name} - {variant.variant_name} - ₱{variant.price} - Stock: {stock}
                                <Inputbox Type={`number`} Value={item.quantity} Min={1} Max={stock} OnChange={(e) => updateQty(Number(variant.id), Number(e.target.value))} />
                                <Button Title={`Remove`} OnClick={() => removeItem(Number(variant.id))} />
                            </Group>
                        )
                    })}
                    <Group Row>Total: ₱{total}</Group>
                    <Group Row>
                        <Button Title={`Checkout`} OnClick={handleCheckout} Disabled={!cart.length} />
                    </Group>
                </Group>
            </Section>
        </Main>
    )
}