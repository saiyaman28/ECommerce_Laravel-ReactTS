// import {React} from 'react'
import '../../assets/styles/Components/Inputbox Selectionbox.sass'

type InputboxProps = {
    ID?: string
    Class?: string
    Title?: string
    Type?: string
    Value?: string | number
    Name?: string
    OnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    MinLength?: number
    Min?: number
    Max?: number
    MinDate?: Date
    MaxDate?: Date
    AutoFocus?: boolean
    Disabled?: boolean
    Required?: boolean
}

export default function Inputbox({ID, Class, Title, Type, Value, Name, OnChange, Min, Max, MinLength, MinDate, MaxDate, AutoFocus, Disabled, Required}: InputboxProps) {
    const ValidType = (Type: string) => {
        const allowedTypes = [`text`, `email`, `date`, `password`, `datetime-local`, `month`, `url`, `number`, `time`, `file`, `search`]
        return allowedTypes.includes( Type ) && Type
    }

    return (
        <input 
            id={ID} 
            className={Class} 
            value={Value}
            name={Name}
            type={ValidType(Type ?? 'text') ? (Type ?? 'text') : `text`}
            onChange={OnChange}
            placeholder={Title} 
            minLength={MinLength}
            min={MinDate ? MinDate.toISOString().split('T')[0] : Min}
            max={MaxDate ? MaxDate.toISOString().split('T')[0] : Max}
            autoFocus={AutoFocus}
            disabled={Disabled}
            required={Required}
        />
    )
}