import { useEffect } from 'react'

export default function AddClassBody( classname: string ) {
    useEffect(() => {
        document.body.classList.add( classname );
        return () => {
            document.body.classList.remove( classname );
        };
    }, [ classname ]);
}