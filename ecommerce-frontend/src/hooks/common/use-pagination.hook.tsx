import { useCallback, useEffect, useMemo, useState } from "react"
import { IoChevronBack, IoChevronForward } from "react-icons/io5"

export type PaginationType = {
    currentPage: number
    pageTotal: number
    itemPerPage: number
    itemTotalCount: number
    siblings: number
}

export type ActivePageType = {
    pageValue: number,
    itemRangeStart: number,
    itemRangeEnd: number
    paginationRange: (string | number)[]
}

const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, index) => index + start);
}

export const usePagination = (params: PaginationType) => {
    const { currentPage = 1, itemPerPage = 1, itemTotalCount = 1, pageTotal = 1, siblings = 1 } = params
    const calculateItemRangeStart = (page: number) => (itemPerPage * (page - 1)) + 1
    const calculateItemRangeEnd = (page: number) => itemPerPage * page > itemTotalCount ? itemTotalCount : itemPerPage * page

    const getPaginationRange = useCallback((pageNumber: number) => {
        // Get All Neccessary Total Page Number need to be rendered
        const totalPageNumbers = siblings * 2 + 5

        // If totalPageNumber is more than page total, then show all. No need ...
        if (totalPageNumbers >= pageTotal) {
            return range(1, pageTotal);
        }

        // Check Left Siblings Index. Fallback is 1
        const leftSiblingIndex = Math.max(pageNumber - siblings, 1)

        // Check Right Siblings Index. Fallback is total Page
        const rightSiblingIndex = Math.min(pageNumber + siblings, pageTotal)

        // IF SI = 2 THEN SHOW 1 .. 3
        const shouldShowLeftDots = leftSiblingIndex > 2
        const shouldShowRightDots = rightSiblingIndex < pageTotal - 2

        if (!shouldShowLeftDots && shouldShowRightDots) {
            // Make a minimum count of left page
            const leftItemCount = siblings * 2 + 3
            return [...range(1, leftItemCount), 'R', pageTotal]
        }

        if (!shouldShowRightDots && shouldShowLeftDots) {
            const rightItemCount = siblings * 2 + 2
            return [1, 'L', ...range(pageTotal - rightItemCount, pageTotal)]
        }

        return [1, 'L', ...range(leftSiblingIndex, rightSiblingIndex), 'R', pageTotal]
    }, [pageTotal, siblings])

    const [activePage, setActivePage] = useState<ActivePageType>({
        pageValue: currentPage,
        itemRangeStart: calculateItemRangeStart(currentPage),
        itemRangeEnd: calculateItemRangeEnd(currentPage),
        paginationRange: getPaginationRange(currentPage)
    })

    const setPage = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= pageTotal) {
            const newRangeStart = calculateItemRangeStart(pageNumber);
            const newRangeEnd = calculateItemRangeEnd(pageNumber);

            setActivePage({
                pageValue: pageNumber,
                itemRangeStart: newRangeStart,
                itemRangeEnd: newRangeEnd,
                paginationRange: getPaginationRange(pageNumber)
            })
        }
    }

    return { activePage, setPage }
}