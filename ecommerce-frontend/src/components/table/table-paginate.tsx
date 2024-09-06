import { IoChevronBack, IoChevronForward } from "react-icons/io5"

type Props = {
    currentPage: number
    paginationRange: (string | number)[]
    onPageChanged: (number: number) => void
}

const TablePaginate = (props: Props) => {
    const { onPageChanged, paginationRange, currentPage } = props

    const handlePagePagination = (page: number | 'L' | 'R') => {
        if (page == 'L') {
            const lastLeftPageNumber = paginationRange[paginationRange.findIndex((pageRange) => pageRange == 'L') + 1] as number - 1
            onPageChanged(lastLeftPageNumber)
        } else if (page == 'R') {
            const lastRightPageNumber = paginationRange[paginationRange.findIndex((pageRange) => pageRange == 'R') - 1] as number + 1
            onPageChanged(lastRightPageNumber)
        } else {
            onPageChanged(page)
        }
    }

    return (
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
                <label className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-md hover:bg-gray-100 hover:text-gray-700">
                    <IoChevronBack onClick={() => onPageChanged(currentPage - 1)} />
                </label>
            </li>
            {paginationRange?.map((page: any, index: number) => (
                <li key={index}>
                    <label
                        className={`flex items-center justify-center px-3 h-8 leading-tight ${page != currentPage ? 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700' : 'bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700'}   border border-gray-300  cursor-pointer`}
                        onClick={() => handlePagePagination(page)}
                    >
                        {Number.isInteger(page) ? page : '...'}
                    </label>
                </li>
            ))}
            <li>
                <label className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-md hover:bg-gray-100 hover:text-gray-700">
                    <IoChevronForward onClick={() => onPageChanged(currentPage + 1)} />
                </label>
            </li>
        </ul>
    )
}

export default TablePaginate