import { useEffect, useRef } from "react"

export const useClickOutside = (handler: Function) => {
    const ref = useRef<any>()

    const onClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            handler()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', onClickOutside);
        return () => {
            document.removeEventListener('mousedown', onClickOutside);
        };
    }, [ref])

    return ref
}