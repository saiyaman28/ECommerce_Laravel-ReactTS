import {useState, useEffect} from 'react'

export default function useScreenWidth(): number {
    const [screenWidth, setScreenWidth] = useState<number>(() => {
        return typeof window !== `undefined` ? window.innerWidth : 0
    })

    useEffect(() => {
        const handleResize = (): void => {setScreenWidth(window.innerWidth)}
        window.addEventListener(`resize`, handleResize)
        return () => window.removeEventListener(`resize`, handleResize)
    }, [])

    return screenWidth
}