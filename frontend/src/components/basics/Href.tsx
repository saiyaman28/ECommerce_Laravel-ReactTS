// import {React} from 'react'
import {Link} from 'react-router-dom'
import '../../assets/styles/Components/Href.sass'

type HrefMode = {
    Redirect?: string
    OnClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

type HrefProps = {
    ID?: string
    Class?: string
    Title?: string
    Object?: React.ReactNode
}

export default function Href({ID, Class, Title, Object, Redirect, OnClick}: HrefMode & HrefProps) {
    return (
        <>
            {Redirect && 
                <Link id={ID} className={Class} to={Redirect}>
                    { Title && Title }{ Object }
                </Link>
            }
            {OnClick && 
                <a id={ID} className={Class} onClick={OnClick}>
                    { Title && Title }{ Object }
                </a>
            }
        </>
    )
}