import { useEffect } from 'react'

export default function AddPageTitle( title: string ) {
    useEffect(() => {
        document.title = title;
    }, [ title ]);
}