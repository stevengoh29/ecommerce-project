import { FILTER_DIRECTION } from "@/core/types/filter.type"
import { IoArrowDown, IoArrowUp } from "react-icons/io5"
import { ColumnSort } from "./table"

type TableHeadCellProps = {
    columnName: string
    width?: string
    onColumnClick?: (direction: FILTER_DIRECTION | undefined) => void
    value?: ColumnSort | undefined
}

const TableHeadCell = (props: TableHeadCellProps) => {
    const { columnName, onColumnClick = () => { }, value, width } = props

    const DirectionIcon = () => {
        if (value?.direction == 'ASC') return <IoArrowUp />
        if (value?.direction == 'DESC') return <IoArrowDown />
        return undefined
    }

    const onChange = (): FILTER_DIRECTION | undefined => {
        if (value?.columnName != columnName) return 'ASC'
        if (value?.direction == 'ASC') return 'DESC'
        if (value?.direction == 'DESC') return undefined
        return 'ASC'
    }

    return (
        <th
            className={`px-4 py-2 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700 ${width ?? 'w-64'}`}
            onClick={columnName == 'Action' ? () => { } : () => onColumnClick(onChange())}
        >
            <div className="flex flex-row select-none items-center justify-between">
                {columnName}
                {value?.columnName == columnName && <DirectionIcon />}
            </div>
        </th>
    )
}

export default TableHeadCell