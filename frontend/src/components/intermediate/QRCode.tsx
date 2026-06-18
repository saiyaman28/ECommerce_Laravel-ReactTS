// import {React} from 'react'
import {QRCodeCanvas} from 'qrcode.react'

type QRCodeProps = {
    ID?: string
    Class?: string
    BaseUrl: string
}

export default function QRCode({ID, Class, BaseUrl}: QRCodeProps) {
    return (
        <div id={ID} className={Class}>
            <QRCodeCanvas
                value={BaseUrl}
                size={200}
                level={`H`}
                includeMargin
            />
        </div>
    )
}