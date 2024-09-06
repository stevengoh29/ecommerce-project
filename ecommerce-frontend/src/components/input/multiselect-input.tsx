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
    value: Option[] | undefined
    options: Option[]
    field?: any
    enableSearch?: boolean
    onSearchInputChanged?: (searchText: string | undefined) => void
    onSelectedChanged: (selectedOption: Option[] | undefined) => void
}

const MultiselectInput = (props: DropdownProps) => {
    const { label, onSearchInputChanged, onSelectedChanged, options, value, enableSearch = false } = props
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const [searchInput, setSearchInput] = useState<string | undefined>()
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([])

    const dropdownRef = useClickOutside(() => setShowDropdown(false))

    const onDropdownClick = useCallback(() => setShowDropdown(!showDropdown), [showDropdown])

    const onOptionClicked = (option: Option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter(item => item !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    }

    const removeOption = (option: Option) => {
        setSelectedOptions(selectedOptions.filter(item => item !== option));
    }

    const onTextChanged = useCallback((text: string) => {
        setSearchInput(text)
    }, [])

    useEffect(() => {
        if (enableSearch && onSearchInputChanged) onSearchInputChanged(searchInput)
    }, [searchInput])

    useEffect(() => {
        onSelectedChanged(selectedOptions)
    }, [selectedOptions])

    return (
        <div className="relative flex-1 text-sm" ref={dropdownRef}>
            <label>{label}</label>
            <div
                className={`border rounded-md border-slate-200 px-5 py-2 flex flex-row items-center gap-5 cursor-pointer mt-1 ${props.field?.disabled ? 'bg-slate-200' : null}`}
                onClick={onDropdownClick}
            >
                <div className="flex-1 flex flex-wrap gap-2">
                    {selectedOptions.map((option, index) => (
                        <div
                            key={index}
                            className="flex items-center bg-slate-100 px-3 rounded-md"
                        >
                            <span>{option.label}</span>
                            <IoClose
                                size={20}
                                className="ml-1 cursor-pointer text-slate-400"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeOption(option);
                                }}
                            />
                        </div>
                    ))}
                </div>
                {!props.field?.disabled && (
                    <IoChevronDown
                        className="cursor-pointer text-slate-400"
                        size={20}
                    />
                )}
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
                    <div className="flex flex-col py-1 max-h-40 overflow-scroll gap-1">
                        {options.map((option, index) => {
                            return <label
                                key={index}
                                className={`hover:bg-slate-100 rounded-md active:bg-slate-200 cursor-pointer duration-100 px-2 py-1 ${selectedOptions.includes(option) ? 'bg-slate-300' : null}`}
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

export default MultiselectInput