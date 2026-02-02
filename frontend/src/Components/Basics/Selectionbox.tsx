// import React from 'react'
import '../../Assets/CSS/Components/Inputbox Selectionbox.sass'

type SelectboxProps = {
    ID?: string
    Class?: string
    Title?: string
    Options?: Array<{ Title: string, ID?: string, Value: string | number }>
    Value?: string | number
    Name?: string
    Multiple?: boolean
    AutoFocus?: boolean
    Disabled?: boolean
    Required?: boolean
}

export default function Selectionbox({ ID, Class, Title, Options, Value, Name, Multiple, AutoFocus, Disabled, Required }: SelectboxProps) {
    return (
        <select 
            id={ID} 
            className={Class} 
            value={Value}
            name={Name}
            multiple={Multiple}
            autoFocus={AutoFocus}
            disabled={Disabled}
            required={Required}
        >
            <option id={`title-option`}>{Title}</option>
            {Options && Options.map((option, index) => (
                <option key={index} id={option.ID} value={option.Value}>
                    {option.Title}
                </option>
            ))}
        </select>
    )
}