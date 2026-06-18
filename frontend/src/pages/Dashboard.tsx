import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

type QRCodeProps = {
    ID?: string;
    Class?: string;
    BaseUrl: string;
    IntervalSeconds?: number;
};

export default function QRCode({
    ID,
    Class,
    BaseUrl,
    IntervalSeconds = 5
}: QRCodeProps) {

    const [timeLeft, setTimeLeft] = useState(IntervalSeconds);

    useEffect(() => {
        setTimeLeft(IntervalSeconds);

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    return IntervalSeconds;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [IntervalSeconds]);

    return (
        <div id={ID} className={Class}>
            <h2>GCash Payment QR</h2>

            <div
                id="qr-box-frame"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "20px"
                }}
            >
                <QRCodeCanvas
                    value={BaseUrl}
                    size={280}
                    level="M"
                    includeMargin
                />
            </div>

            <p style={{ textAlign: "center" }}>
                QR refreshes in: {timeLeft}s
            </p>

            <div
                style={{
                    padding: "10px",
                    background: "#f8fafc",
                    borderRadius: "6px"
                }}
            >
                <small
                    style={{
                        display: "block",
                        color: "#94a3b8"
                    }}
                >
                    Active Payload
                </small>

                <code
                    style={{
                        wordBreak: "break-all",
                        fontFamily: "monospace",
                        fontSize: "12px"
                    }}
                >
                    {BaseUrl}
                </code>
            </div>
        </div>
    );
}