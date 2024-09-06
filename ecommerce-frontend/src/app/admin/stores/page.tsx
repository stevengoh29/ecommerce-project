'use client'

import FlexBox from "@/components/box/flex-box"
import Button from "@/components/button/button"
import TableActionButton from "@/components/button/table-action-button"
import Container from "@/components/container/content-wrapper.container"
import SectionContainer from "@/components/container/section-wrapper.container"
import BaseTextInput from "@/components/input/base-text-input"
import DropdownInput from "@/components/input/dropdown-input"
import Table, { TableColumnType } from "@/components/table/table"
import { DEBOUNCED_TIMEOUT } from "@/core/constant/app.constant"
import { useGetMainCategoryFilterOptions, useGetMainCategoryOptions } from "@/hooks/category/main-category.query"
import useDebounceValue from "@/hooks/common/use-debounced-value.hook"
import useDialog from "@/hooks/common/use-dialog.hook"
import { useFilter } from "@/hooks/common/use-filter.hook"
import { useAppSelector } from "@/hooks/common/use-redux.hook"
import { useGetStoreFilterStatusOption, useGetStores } from "@/hooks/stores/store.query"
import { StoreData } from "@/services/stores/store.service"
import { useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent } from "react"

const STORES_COLUMN = [
    { key: 'uuid', label: '# Id', width: 'w-32', type: ('LINK' as TableColumnType) },
    { key: 'imageUrl', label: 'Image', width: 'w-9', type: ('IMAGE' as TableColumnType) },
    { key: 'name', label: 'Store Name', width: 'w-32' },
    { key: 'mainCategory.name', label: 'Main Category', width: 'w-48' },
    { key: 'isInactive', label: 'Is Inactive?', width: 'w-32', type: ('BOOL' as TableColumnType) },
    { key: 'isSuspended', label: 'Is Suspended?', width: 'w-32', type: ('BOOL' as TableColumnType) }
]

const StoreListing = () => {
    const searchParams = useSearchParams()
    const { push } = useRouter()

    const { role } = useAppSelector(root => root.users)

    const { filterOptions, handleCheckedChange, handlePaginationChanged, handleReset, handleTextChange, handleOptionChanged } = useFilter({
        page: searchParams.get('page') ?? '1',
        name: searchParams.get('name') ?? '',
        showType: searchParams.get('showType') ?? ''
    })

    const { debouncedValue } = useDebounceValue(filterOptions, DEBOUNCED_TIMEOUT)
    const { data } = useGetStores(debouncedValue)
    const { data: mainCategoryOptions } = useGetMainCategoryOptions()
    const statusFilterOption = useGetStoreFilterStatusOption()

    return (
        <Container title="Store Listing Page">
            <SectionContainer>
                <FlexBox className="gap-5 lg:flex-row">
                    <BaseTextInput
                        label="Name"
                        onReset={() => handleTextChange('name', '')}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextChange('name', e.target.value)}
                    />
                    <DropdownInput
                        label="Main Category"
                        options={mainCategoryOptions ?? []}
                        onSelectedChanged={(opt) => handleOptionChanged('mainCategoryUuid', opt)}
                        value={mainCategoryOptions?.filter(status => { return status.value == filterOptions['mainCategoryUuid'] }).at(0)}
                    />
                    <DropdownInput
                        label="Show Type"
                        options={statusFilterOption}
                        onSelectedChanged={(opt) => handleOptionChanged('showType', opt)}
                        value={statusFilterOption.filter(status => { return status.value == filterOptions['showType'] }).at(0)}
                    />
                </FlexBox>
                <div className='flex mt-3 flex-wrap justify-end gap-3'>
                    <Button label={'Reset'} className={'w-40'} onClick={handleReset} />
                </div>
            </SectionContainer>

            <SectionContainer>
                <Table
                    columns={STORES_COLUMN}
                    data={data?.data ?? []}
                    enablePagination
                    actionColumns={[
                        { element: <TableActionButton type="VIEW" />, onClick: (store: StoreData) => { alert('View' + JSON.stringify(store)) } },
                        { element: <TableActionButton type="EDIT" />, onClick: (store: StoreData) => { push(`/admin/stores/${store.uuid}/edit`) } }
                    ]}
                    onPaginationChanged={(page) => handlePaginationChanged(page)}
                />
            </SectionContainer>
        </Container>
    )
}

export default StoreListing