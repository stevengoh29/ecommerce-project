import * as React from "react";

export default function useDebounceValue(value: any, delay: number) {
    const [debouncedValue, setDebouncedValue] = React.useState(value);
    const [debounceLoading, setDebounceLoading] = React.useState(false);

    React.useEffect(() => {
        setDebounceLoading(true);
        const handler = setTimeout(() => {
            setDebouncedValue(value);
            setDebounceLoading(false);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return { debouncedValue, debounceLoading };
}