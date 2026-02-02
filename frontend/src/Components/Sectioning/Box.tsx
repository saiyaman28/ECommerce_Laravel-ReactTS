import React from 'react'
import '../../Assets/CSS/Components/Box.sass'

type BoxProps = {
    children?: React.ReactNode
    ID?: string
    Class?: string
    Title?: string
    UpperLeft?: boolean
    UpperRight?: boolean
    BoxRow?: boolean
    BoxWrap?: boolean
}

export default function Box({ children, ID, Class, Title, UpperLeft, UpperRight, BoxRow, BoxWrap }: BoxProps) {
    return(
        <div id={ ID } className={`box ${ BoxRow && `boxrow` } ${ BoxWrap && `boxwrap` } ${ Class }`}>
            { UpperLeft || UpperRight ? 
                <div className={`title`}>
                    <div className={`left`}>{ UpperLeft && UpperLeft }</div>
                    <h2>{ Title }</h2>
                    <div className={`right`}>{ UpperRight && UpperRight }</div>
                </div>
            :
                Title && <h2>{ Title }</h2>
            }
            { children }
        </div>
    )
}
