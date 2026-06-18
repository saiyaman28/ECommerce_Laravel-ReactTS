// import {React} from 'react'
import {useNavigate} from 'react-router-dom'
import '../../assets/styles/Components/Button.sass'

type ButtonMode = {
    Redirect?: string
    OnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    Navigate?: string
    Submit?: boolean
    Radio?: boolean
    File?: boolean
}

type ButtonProps = {
    ID?: string
    Class?: string
    Title?: string
    Name?: string
    Value?: string | number 
    Accept?: string
    Disabled?: boolean
    OnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Button({ID, Class, Title, Name, Value, Accept, Disabled, Redirect, OnClick, OnChange, Submit, Radio, File}: ButtonProps & ButtonMode) {
    const Navigation = useNavigate()

    const HandleNavigation = () => {
        const path = Redirect
        if (path) Navigation(path)
    }

    return (
        <>
            {(Redirect) &&
                <button id={ID} className={Class} disabled={Disabled} onClick={HandleNavigation} >
                    {Title}
                </button>
            }
            {(OnClick) &&
                <button id={ID} className={Class} disabled={Disabled} onClick={OnClick} >
                    {Title}
                </button>

            }
            {Submit &&
                <button type={`submit`} id={ID} className={Class} disabled={Disabled}>
                    {Title}
                </button>
            }
            {Radio &&
                <label className={Class}>
                    <input type={`radio`} id={ID} name={Name} value={Value}/>
                    {Title}
                </label>
            }
            {File &&
                <label className={Class}>
                    <input type={`file`} id={ID} name={Name} accept={Accept} onChange={OnChange}/>
                    {Title}
                </label>
            }
        </>
    )
}