import React from 'react'
import '../../Assets/CSS/Components/Group.sass'

type GroupProps = {
    children?: React.ReactNode
    ID?: string
    Class?: string
    Row?: boolean
    Wrap?: boolean
}

export default function Group({ children, ID, Class, Row, Wrap }: GroupProps) {
    return(
        <div id={ ID } className={`group ${ Row && `row` } ${ Wrap && `wrap` } ${ Class }`}>
            { children }
        </div>
    )
}