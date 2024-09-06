'use client'

import { useClickOutside } from "@/hooks/common/use-click-outside.hook"
import { useCallback, useEffect, useState } from "react"
import { IoChevronDown, IoClose, IoSearch } from "react-icons/io5"

export type Option = {
    label: string,
    value: string | number
}

type DropdownProps = {
    label: string
    value: Option | undefined
    options: Option[]
    field?: any
    enableSearch?: boolean
    onSearchInputChanged?: (searchText: string | undefined) => void
    onSelectedChanged: (selectedOption: Option | undefined) => void
}

const DropdownInput = (props: DropdownProps) => {
    const { label, onSearchInputChanged, onSelectedChanged, options, value, enableSearch = false } = props
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const [searchInput, setSearchInput] = useState<string | undefined>()

    const dropdownRef = useClickOutside(() => setShowDropdown(false))

    const onDropdownClick = useCallback(() => setShowDropdown(!showDropdown), [showDropdown])

    const onOptionClicked = useCallback((option: Option | undefined) => {
        setShowDropdown(false)
        onSelectedChanged(option)
    }, [value])

    const onTextChanged = useCallback((text: string) => {
        setSearchInput(text)
    }, [])

    useEffect(() => {
        if (enableSearch && onSearchInputChanged) onSearchInputChanged(searchInput)
    }, [searchInput])

    return (
        <div className="relative flex-1 text-sm" ref={dropdownRef}>
            <label>{label}</label>
            <div className={`border rounded-md border-slate-200 px-5 py-2 flex flex-row items-center gap-5 cursor-pointer mt-1 ${props.field?.disabled ? 'bg-slate-200' : null}`}>
                <input className="flex-1 focus:outline-none cursor-pointer bg-transparent" {...props.field} onClick={onDropdownClick} readOnly value={value?.label ?? ''} />
                {!props.field?.disabled &&
                    <>
                        <div onClick={() => onOptionClicked(undefined)}>
                            {value && <IoClose size={20} className={'cursor-pointer text-slate-400'} />}
                        </div>
                        <IoChevronDown className={'cursor-pointer text-slate-400'} size={20} onClick={onDropdownClick} />
                    </>
                }
            </div>

            {
                showDropdown &&
                <div className="shadow-lg bg-white border border-slate-200 pb-3 px-3 pt-2 absolute flex flex-col flex-1 w-full rounded-md z-10">
                    {
                        enableSearch &&
                        <div className="flex border-b items-center px-2 py-1 gap-5">
                            <input className="flex-1 outline-none" value={searchInput} onChange={(e) => onTextChanged(e.target.value)} />
                            <IoSearch />
                        </div>
                    }
                    <div className="flex flex-col py-1 max-h-40 overflow-scroll">
                        {options.map((option, index) => {
                            return <label
                                key={index}
                                className={`hover:bg-slate-100 rounded-md active:bg-slate-200 cursor-pointer duration-100 px-2 py-1 ${value?.value == option.value ? 'bg-slate-200' : null}`}
                                onClick={() => onOptionClicked(option)}
                            >
                                {option.label}
                            </label>
                        })}
                    </div>
                </div>
            }
        </div >
    )
}

export default DropdownInput