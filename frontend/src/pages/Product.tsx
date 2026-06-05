// import {React} from 'react'
import {useStateContext} from '../context_provider'
import {useAddPageTitle, useAddClassBody, useScreenWidth, useViewProducts} from "../exporter/hooks"
import {Main, Section, Group, Inputbox, Button} from "../exporter/components"
import '../assets/styles/Pages/Create_Product.sass'

export default function ProductPage() {    
    const {user} = useStateContext()
    const {quantity, stocks, filteredItems, handleQuantity, addToCart} = useViewProducts()

    useAddPageTitle(filteredItems?.product_name && filteredItems?.variant_name
        ? `${filteredItems?.product_name} - ${filteredItems?.variant_name}`
        : `Product`)
    useAddClassBody(`Create-Product-Page`)
    const screenwidth = useScreenWidth()

    return (
        <Main>
            <Section Title={`ALL PRODUCTS`} ID={`list-product`}>
                <Group>
                    Product: {filteredItems?.product_name} <br/>
                    Variant: {filteredItems?.variant_name} <br/>
                    Price: ₱{filteredItems?.price} <br/>
                    Stock: {filteredItems?.stock} <br/>
                    Description: {filteredItems?.description} 
                    {filteredItems?.image && 
                        <Group>
                            <img src={`http://127.0.0.1:8000/storage/${filteredItems.image}`} width={`150`} />
                        </Group>
                    }
                </Group>
                {user?.id ?
                    <Group>
                        <Inputbox Title={`Quantity`} Name={`Quantity`} Value={quantity} Min={1} Max={stocks} OnChange={(e) => handleQuantity(Number(e.target.value))} />
                        <Button Title={`Add To Cart`} OnClick={addToCart} Disabled={stocks <= 0} />
                        <Button Title={`Go to Cart`} Redirect={user?.role === `customer` ? `/customer/cart` : `/admin/cart`} />
                    </Group>
                    :
                    <Group>
                        <Inputbox Title={`Quantity`} Name={`Quantity`} Value={quantity} Min={1} Max={stocks} OnChange={(e) => handleQuantity(Number(e.target.value))} />
                        <Button Title={`Add To Cart`} Redirect={`/login`} />
                        <Button Title={`Go to Cart`} Redirect={`/login`} />
                    </Group>
                }
            </Section>
        </Main>
    )
}