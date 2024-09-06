import { URL_API_ENDPOINT } from "@/core/constant/app.constant"
import { Metadata } from "@/core/types/api-result.type"
import { FILTER_DIRECTION } from "@/core/types/filter.type"
import { PaginationType, usePagination } from "@/hooks/common/use-pagination.hook"
import React, { useCallback, useState } from "react"
import { IoImage } from "react-icons/io5"
import TableCell from "./table-cell"
import TableHeadCell from "./table-head-cell"
import TablePaginate from "./table-paginate"

export type TableColumnType = 'TEXT' | 'IMAGE' | 'LINK' | 'BOOL' | 'IMAGES'

export type TableColumnProps = {
    key: string
    label: string
    width?: string,
    type?: TableColumnType
}

type TableProps = {
    columns: TableColumnProps[],
    data: any[]
    enablePagination?: boolean
    onPaginationChanged?: (number: number) => void
    paginationMetadata?: Metadata
    actionColumns?: {
        element: React.ReactNode,
        onClick: (data: any, index: number) => void
    }[]
}

export type ColumnSort = {
    direction: FILTER_DIRECTION,
    columnName: string
}

const Table = (props: TableProps) => {
    const { columns, data, enablePagination = false, paginationMetadata, onPaginationChanged, actionColumns = [] } = props

    const [sort, setSort] = useState<undefined | ColumnSort>()

    const onColumnClick = useCallback((column: string, direction: FILTER_DIRECTION | undefined) =>
        direction == undefined ? setSort(undefined) : setSort({ columnName: column, direction }), [sort])

    const pagination: PaginationType = {
        currentPage: Number.parseInt(paginationMetadata?.currentPage ?? "1"),
        itemPerPage: Number.parseInt(paginationMetadata?.itemPerPage ?? "1"),
        itemTotalCount: Number.parseInt(paginationMetadata?.totalItemCount ?? "1"),
        pageTotal: Number.parseInt(paginationMetadata?.totalPage ?? "1"),
        siblings: 1
    }

    const paginationData = usePagination(pagination)

    const handleOnPageChanged = (number: number) => {
        paginationData?.setPage(number)
        onPaginationChanged && onPaginationChanged(number)
    }

    const getCellValue = (column: TableColumnProps, dataRow: any) => {
        const value = column.key.includes('.') ?
            column.key.split('.').reduce((o, k: any) => (o && o[k] !== 'undefined' ? o[k] : '-'), dataRow) :
            dataRow[column.key] ?? '-'

        if (column.type == 'IMAGES') {
            if (value == '-') return <IoImage className="w-9 h-9 text-slate-400" />

            const firstImage = JSON.parse(value) as string[]
            return <img src={URL_API_ENDPOINT + firstImage[0]} alt="No Image" className="rounded-full w-9 h-9 m-auto" />
        }
        if (column.type == 'IMAGE') return value == '-' ? <IoImage className="w-9 h-9 text-slate-400" /> : <img src={URL_API_ENDPOINT + value} alt="No Image" className="rounded-full w-9 h-9 m-auto" />
        if (column.type == 'LINK') return <label className="text-blue-500 hover:text-blue-700 cursor-pointer duration-300 font-bold" onClick={() => alert('oke')}>{value}</label>
        if (column.type == 'BOOL') return value == true ? 'Yes' : 'No'
        return value
    }

    return (
        <div className="flex flex-col gap-5 overflow-x-auto w-full">
            <table className="min-w-full bg-white border border-gray-200 border-collapse">
                <thead>
                    <tr>
                        {columns.map((column, index) => {
                            return (
                                <TableHeadCell
                                    key={index}
                                    columnName={column.label}
                                    value={sort}
                                    onColumnClick={(direction) => onColumnClick(column.label, direction)}
                                    width={column.width}
                                />
                            )
                        })}
                        {actionColumns.length > 0 && <TableHeadCell columnName={'Action'} />}
                    </tr>
                </thead>
                <tbody>
                    {data.map((data, index) => {
                        return (
                            <tr key={index}>
                                {columns.map((column, index) => (
                                    <TableCell key={index} className={`${column.width ?? 'w-64'}`}>
                                        <div className={`truncate ${column.width ?? 'w-64'}`}>
                                            {getCellValue(column, data)}
                                        </div>
                                    </TableCell>
                                ))}
                                {actionColumns.length > 0 && (
                                    <TableCell className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700 truncate">
                                        <div className='flex gap-3'>
                                            {actionColumns.map((action, index) => (
                                                <div key={index} onClick={() => action.onClick(data, index)}>{action.element}</div>
                                            ))}
                                        </div>
                                    </TableCell>
                                )}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {enablePagination &&
                <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between" aria-label="Table navigation">
                    <span className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900">
                        {paginationData.activePage.itemRangeStart} - {paginationData.activePage.itemRangeEnd}
                    </span> of <span className="font-semibold text-gray-900">{pagination.itemTotalCount}</span></span>
                    <TablePaginate currentPage={paginationData.activePage.pageValue} onPageChanged={(number) => handleOnPageChanged(number)} paginationRange={paginationData.activePage.paginationRange} />
                </nav>
            }
        </div>
    )
}

export default Table