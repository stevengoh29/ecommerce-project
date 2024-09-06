'use client'

import Button from "@/components/button/button"
import TableActionButton from "@/components/button/table-action-button"
import Container from "@/components/container/content-wrapper.container"
import SectionContainer from "@/components/container/section-wrapper.container"
import Table, { TableColumnType } from "@/components/table/table"
import { DEBOUNCED_TIMEOUT } from "@/core/constant/app.constant"
import useDebounceValue from "@/hooks/common/use-debounced-value.hook"
import { useFilter } from "@/hooks/common/use-filter.hook"
import { useAppSelector } from "@/hooks/common/use-redux.hook"
import { useGetProducts } from "@/hooks/products/product.query"
import { ProductData } from "@/services/products/product.service"
import { useRouter, useSearchParams } from "next/navigation"

const PROD_COLUMN = [
    { key: 'uuid', label: '# Id', width: 'w-32', type: 'LINK' as TableColumnType },
    { key: 'imageUrl', label: 'Image', width: 'w-9', type: 'IMAGES' as TableColumnType },
    { key: 'name', label: 'Product Name', width: 'w-48' },
    { key: 'subCategory.name', label: 'Subcategory Name', width: 'w-48' },
    { key: 'isInactive', label: 'Is Inactive?', width: 'w-32', type: 'BOOL' as TableColumnType },
]

const ProductListingPage = () => {
    const searchParams = useSearchParams()
    const { storeId } = useAppSelector(root => root.users)
    const router = useRouter()

    const { filterOptions, handleCheckedChange, handleOptionChanged, handlePaginationChanged, handleReset, handleTextChange } = useFilter({
        name: searchParams.get('name') ?? '',
        includeInactive: searchParams.get('includeInactive') ?? false,
    })

    const { debouncedValue } = useDebounceValue(filterOptions, DEBOUNCED_TIMEOUT)
    const { data, refetch, isPending } = useGetProducts({ ...debouncedValue, storeUuid: storeId })

    return (
        <Container title="Product Listing">
            <SectionContainer>
                <p>Filter here</p>
            </SectionContainer>
            <SectionContainer className="gap-3 flex flex-col">
                <Button label="Add New Product" className={'self-end'} onClick={() => router.push('/seller/product/add')} />
                {
                    data?.data == undefined || isPending ? <p>Loading Data...</p> : (
                        <Table
                            columns={PROD_COLUMN}
                            data={data.data}
                            enablePagination
                            paginationMetadata={data.meta}
                            onPaginationChanged={(pageNumber) => handlePaginationChanged(pageNumber)}
                            actionColumns={[
                                { element: <TableActionButton type="VIEW" />, onClick: (product: ProductData) => { alert('View' + JSON.stringify(product)) } },
                                { element: <TableActionButton type="EDIT" />, onClick: (product: ProductData) => { router.push(`/seller/product/${product.uuid}/edit`) } },
                                { element: <TableActionButton type="DELETE" />, onClick: (product: ProductData) => {  } }
                            ]}
                        />
                    )
                }
            </SectionContainer>
        </Container>
    )
}

export default ProductListingPage