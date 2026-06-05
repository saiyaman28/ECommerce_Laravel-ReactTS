import {useEffect} from 'react'

export default function useAddPageTitle(title: string): void {
    useEffect(() => {
        if (!title) return
        document.title = title
    }, [title])
}