// import {React} from 'react'
import {useStateContext} from '../context_provider'
import {useAddPageTitle, useAddClassBody, useScreenWidth, useViewProducts} from '../exporter/hooks'
import {Main, Section, Group, Inputbox, Button} from '../exporter/components'
import '../assets/styles/Pages/Product.sass'

export default function ProductPage() {    
    const {user} = useStateContext()
    const {quantity, stocks, filteredItems, handleQuantity, addToCart, similarItems} = useViewProducts()

    useAddPageTitle(filteredItems?.product_name && filteredItems?.variant_name
        ? `${filteredItems?.product_name} - ${filteredItems?.variant_name}`
        : `Product`)
    useAddClassBody(`Create-Product-Page`)
    const screenwidth = useScreenWidth()

    return (
        <Main>
            <Section ID={`product`}>
                <Group Row>
                    {filteredItems?.image &&
                        <Group>
                            <img src={`http://127.0.0.1:8000/storage/${filteredItems.image}`} width={`150`} />
                        </Group>
                    }
                    <Group>
                        <Group>
                            <h1>{filteredItems?.product_name}</h1>
                            <h4>{filteredItems?.variant_name}</h4>
                            {filteredItems?.stock ?
                                <h3>{filteredItems?.price && `₱${filteredItems?.price}`}</h3>
                                :
                                <h3>PRODUCT OUT OF STOCK</h3>
                            }
                            <p>{filteredItems?.description}</p>
                        </Group>
                        {user?.id ?
                            <Group>
                                <Inputbox Type={`number`} Title={`Quantity`} Name={`Quantity`} Value={quantity} Min={1} Max={stocks} OnChange={(e) => handleQuantity(Number(e.target.value))} />
                                <Group Row>
                                    <Button Title={`Add To Cart`} OnClick={addToCart} Disabled={stocks <= 0} />
                                    <Button Title={`Go to Cart`} Redirect={user?.role === `customer` ? `/customer/cart` : `/admin/cart`} />
                                </Group>
                            </Group>
                            :
                            <Group >
                                <Inputbox Type={`number`} Title={`Quantity`} Name={`Quantity`} Value={quantity} Min={1} Max={stocks} OnChange={(e) => handleQuantity(Number(e.target.value))} />
                                <Group Row>
                                    <Button Title={`Add To Cart`} Redirect={`/login`} />
                                    <Button Title={`Go to Cart`} Redirect={`/login`} />
                                </Group>
                            </Group>
                        }
                    </Group>
                </Group>
            </Section>
            {similarItems?.length > 0 &&
                <Section Title={`SIMILAR PRODUCTS`} ID={`list-product`}>
                    {similarItems.map((i) => (
                        <Group Row key={i.id}>
                            {i.image && <img src={`http://127.0.0.1:8000/storage/${i.image}`} width={`150`} />}
                            {i.product_name} - {i.variant_name} - {i.category_name} - ₱{i.price} - Stock: {i.stock}
                            <Button Title={`View`} Redirect={user?.role === `customer` ? `/customer/product/${i.id}` : user?.role === `admin` ? `/admin/product/${i.id}` : `/product/${i.id}`} />
                        </Group>
                    ))}
                </Section>
            }
        </Main>
    )
}