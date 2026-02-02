import React from 'react'
import '../../Assets/CSS/Components/Section.sass'

type SectionProps = {
    children?: React.ReactNode
    ID?: string
    Class?: string
    Title?: string
    UpperLeft?: boolean
    UpperRight?: boolean
}

export default function Section({ children, ID, Class, Title, UpperLeft, UpperRight }: SectionProps) {
    return(
        <section id={ID} className={Class}>
            { UpperLeft || UpperRight ? 
                <div className={`title`}>
                    <div className={`left`}>{UpperLeft && UpperLeft}</div>
                    <h1>{ Title }</h1>
                    <div className={`right`}>{UpperRight && UpperRight}</div>
                </div>
            : 
                Title && <h1>{Title}</h1> 
            }
            {children}
        </section>
    )
}