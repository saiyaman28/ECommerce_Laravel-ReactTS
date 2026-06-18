// import {React} from 'react'
import '../../assets/styles/Components/Main.sass'

type MainProps = {
    children?: React.ReactNode
    ID?: string
    Class?: string
    Row?: boolean
}

export default function Main({ children, ID, Class, Row }: MainProps) {
    return(
        <main id={ID} className={`${Class} ${Row && `row`}`}>
            {children}
        </main>
    )
}
