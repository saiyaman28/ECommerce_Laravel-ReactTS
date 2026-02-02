// import React from 'react'
import '../../Assets/CSS/Components/Card.sass'

type CardProps = {
    ID?: string
    Class?: string
    Title?: string
    Image?: string
    BGImage?: string
}

export default function Card({ ID, Class, Title, Image, BGImage }: CardProps ) {
    return (
        <label id={ID} className={`${Class} card`}>
            <div>
            { Image && 
            <>
                { BGImage && <img src={BGImage} className={`bgimage`} /> }
                <img src={Image} />
            </>
            }
            </div>
            <h2>{Title}</h2>
        </label>
    )
}