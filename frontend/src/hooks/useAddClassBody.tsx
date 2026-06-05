import {useEffect} from 'react'

export default function useAddClassBody(classname: string): void {
    useEffect(() => {
        if (!classname) return
        document.body.classList.add(classname)
        return () => {document.body.classList.remove(classname)}
    }, [classname])
}