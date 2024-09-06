'use client'

import Button from "@/components/button/button"
import TableActionButton from "@/components/button/table-action-button"
import Container from "@/components/container/content-wrapper.container"
import SectionContainer from "@/components/container/section-wrapper.container"
import BaseTextInput from "@/components/input/base-text-input"
import CheckboxInput from "@/components/input/checkbox-input"
import Table, { TableColumnType } from "@/components/table/table"
import { DEBOUNCED_TIMEOUT } from "@/core/constant/app.constant"
import useDebounceValue from "@/hooks/common/use-debounced-value.hook"
import { useFilter } from "@/hooks/common/use-filter.hook"
import { useAppSelector } from "@/hooks/common/use-redux.hook"
import { useGetProductDisplay } from "@/hooks/product-display/product-display.query"
import { ProductDisplayData } from "@/services/products/product-display.service"
import { useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent } from "react"

const PRODUCT_DISPLAY_COLUMN = [
    { key: 'uuid', label: 'Display Id', width: 'w-32', type: 'LINK' as TableColumnType },
    { key: 'name', label: 'Display Name', width: 'w-64' },
    { key: 'description', label: 'Description', width: 'w-64' },
    { key: 'isInactive', label: 'Is Inactive?', width: 'w-32', type: 'BOOL' as TableColumnType },
]

const ProductDisplayPage = () => {
    const searchParams = useSearchParams()
    const { storeId } = useAppSelector(root => root.users)
    const router = useRouter()

    const { filterOptions, handleCheckedChange, handleOptionChanged, handlePaginationChanged, handleReset, handleTextChange } = useFilter({
        name: searchParams.get('name') ?? '',
        includeInactive: searchParams.get('includeInactive') ?? false,
    })

    const { debouncedValue } = useDebounceValue(filterOptions, DEBOUNCED_TIMEOUT)
    const { data, refetch } = useGetProductDisplay({ ...debouncedValue, store: storeId ?? '' })

    const handleDelete = (display: ProductDisplayData) => {
        refetch()
    }

    return (
        <Container title="Product Display">
            <SectionContainer>
                <div className='flex flex-col w-full lg:gap-2 gap-2'>
                    <BaseTextInput
                        label='Product Display Name'
                        value={filterOptions['name'] ?? ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextChange('name', e.target.value)}
                        onReset={() => handleTextChange('name', '')}
                    />

                    <CheckboxInput label="Include inactive categories" checked={filterOptions['includeInactive'] ?? false} onChange={(e) => handleCheckedChange('includeInactive')} />
                </div>
            </SectionContainer>
            <SectionContainer className="gap-3 flex flex-col">
                <Button label="Add Product Display" className={'w-fit self-end'} onClick={() => router.push('/seller/product-display/add')} />
                <Table
                    columns={PRODUCT_DISPLAY_COLUMN}
                    data={data?.data ?? []}
                    enablePagination
                    paginationMetadata={data?.meta}
                    onPaginationChanged={(pageNumber) => handlePaginationChanged(pageNumber)}
                    actionColumns={[
                        { element: <TableActionButton type="VIEW" />, onClick: (display: ProductDisplayData) => { alert('View' + JSON.stringify(display)) } },
                        { element: <TableActionButton type="EDIT" />, onClick: (display: ProductDisplayData) => { router.push(`/seller/product-display/${display.uuid}/edit`) } },
                        { element: <TableActionButton type="DELETE" />, onClick: (display: ProductDisplayData) => { handleDelete(display) } }
                    ]}
                />
            </SectionContainer>
        </Container>
    )
}

export default ProductDisplayPage