import { Option } from "@/components/input/dropdown-input"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export const useFilter = (defaultValues: any) => {
    const [filterOptions, setFilterOptions] = useState<any>(defaultValues)

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const handlePaginationChanged = (number: number) => {
        setFilterOptions((prev: any) => ({ ...prev, page: number }))
    }

    const handleOptionChanged = (key: string, option: Option | undefined) => {
        setFilterOptions((prev: any) => ({
            ...prev,
            page: 1,
            [key]: option?.value || ''
        }));
    }

    const handleCheckedChange = (key: string) => {
        setFilterOptions((prev: any) => ({
            ...prev,
            page: 1,
            [key]: !prev[key]
        }));
    }

    const handleTextChange = (key: string, text: string) => {
        setFilterOptions((prev: any) => ({
            ...prev,
            page: 1,
            [key]: text
        }))
    }

    const handleSearchParams = () => {
        const params = new URLSearchParams(searchParams)

        Object.keys(filterOptions).map((key) => {
            const value = filterOptions[key]
            if (value != '') {
                params.set(key, value)
            } else {
                params.delete(key)
            }
        })

        router.replace(`${pathname}?${params.toString()}`)
    }

    const handleReset = () => {
        setFilterOptions((prev: any) =>
            Object.fromEntries(Object.keys(prev).map(key => [key, '']))
        )

        router.replace(pathname)
    }

    useEffect(() => {
        handleSearchParams()
    }, [filterOptions])

    return { filterOptions, handleCheckedChange, handleTextChange, handleOptionChanged, handlePaginationChanged, handleReset }
}