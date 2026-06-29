// import {React} from 'react'
import '../../assets/styles/Components/Card.sass'

type CardProps = {
    ID?: string
    Class?: string
    ProductTitle?: string
    VariantTitle?: string
    Price?: string
    Image?: string | null
    BGImage?: string
}

export default function Card({ID, Class, ProductTitle, VariantTitle, Price, Image}: CardProps) {
    return (
        <label id={ID} className={`${Class} card`}>
            {Image ? <img src={Image} /> : <div></div>}
            <div>
                <h3>{ProductTitle}</h3>
                <h5>{VariantTitle}</h5>
                <h5>{Price}</h5>
            </div>
        </label>
    )
}