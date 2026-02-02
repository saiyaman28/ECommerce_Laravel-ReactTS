import { useState, useEffect } from 'react'

export default function UseScreenWidth() {
    const [screenwidth, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return screenwidth;
}