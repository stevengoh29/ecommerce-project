import { useCallback, useEffect, useRef, useState } from "react"

const useHover = () => {
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const ref = useRef<any>()

    const onMouseEntered = useCallback(() => setIsHovered(true), [])
    const onMouseLeave = useCallback(() => setIsHovered(false), [])

    useEffect(() => {
        if (ref.current) {
            ref.current.addEventListener("mouseenter", onMouseEntered);
            ref.current.addEventListener("mouseleave", onMouseLeave);
            return () => {
                ref.current?.removeEventListener("mouseenter", onMouseEntered);
                ref.current?.removeEventListener("mouseleave", onMouseLeave);
            };
        }
    }, [])

    return { isHovered, ref }
}

export default useHover