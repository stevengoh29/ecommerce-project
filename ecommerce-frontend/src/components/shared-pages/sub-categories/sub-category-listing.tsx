'use client'

import Button from "@/components/button/button"
import TableActionButton from "@/components/button/table-action-button"
import SectionContainer from "@/components/container/section-wrapper.container"
import BaseTextInput from "@/components/input/base-text-input"
import CheckboxInput from "@/components/input/checkbox-input"
import DropdownInput from "@/components/input/dropdown-input"
import Loading from "@/components/loading/loading"
import Table, { TableColumnType } from "@/components/table/table"
import { DEBOUNCED_TIMEOUT } from "@/core/constant/app.constant"
import { useGetMainCategoryOptions } from "@/hooks/category/main-category.query"
import { useGetSubCategories } from "@/hooks/category/sub-category.query"
import useDebounceValue from "@/hooks/common/use-debounced-value.hook"
import { useFilter } from "@/hooks/common/use-filter.hook"
import { useAppSelector } from "@/hooks/common/use-redux.hook"
import { SubcategoryData } from "@/services/categories/sub-category.service"
import { useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent } from "react"

const SUB_CAT_COLUMN = [
    { key: 'uuid', label: 'Category Id', width: 'w-32' },
    { key: 'imagePath', label: 'Image', width: 'w-9', type: 'IMAGE' as TableColumnType },
    { key: 'name', label: 'Category Name', width: 'w-64' },
    { key: 'mainCategory.name', label: 'Main Category', width: 'w-64' },
    { key: 'isInactive', label: 'Is Inactive?', width: 'w-32', type: 'BOOL' as TableColumnType },
]

const SubCategoryListing = () => {
    const searchParams = useSearchParams()
    const router = useRouter()

    const { role } = useAppSelector(root => root.users)

    const { data: mainCategoryOptions } = useGetMainCategoryOptions()

    const {
        filterOptions,
        handleCheckedChange,
        handleOptionChanged,
        handlePaginationChanged,
        handleTextChange,
        handleReset
    } = useFilter({
        page: searchParams.get('page') ?? '1',
        name: searchParams.get('name') ?? '',
        mainCategoryUuid: searchParams.get('mainCategoryUuid') ?? '',
        includeInactive: searchParams.get('includeInactive') ?? false
    })

    const { debouncedValue, debounceLoading } = useDebounceValue(filterOptions, DEBOUNCED_TIMEOUT)
    const { data, isLoading } = useGetSubCategories(debouncedValue)

    return (
        <>
            <SectionContainer>
                <div className="flex flex-col gap-3">
                    <div className='flex lg:flex-row flex-col w-full lg:gap-5 gap-3'>
                        <BaseTextInput
                            label='Sub category Name'
                            value={filterOptions['name'] ?? ''}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextChange('name', e.target.value)}
                            onReset={() => handleTextChange('name', '')}
                        />

                        {mainCategoryOptions &&
                            <DropdownInput label="Main Category" value={mainCategoryOptions.filter((value) => { return value.value === filterOptions['mainCategoryUuid'] }).at(0)} onSelectedChanged={(opt) => handleOptionChanged('mainCategoryUuid', opt)} options={mainCategoryOptions ?? []} />
                        }
                    </div>

                    <CheckboxInput label="Include inactive categories" checked={filterOptions['includeInactive'] ?? false} onChange={(e) => handleCheckedChange('includeInactive')} />
                </div>

                <div className='flex mt-3 flex-wrap justify-end gap-3'>
                    <Button label={'Reset'} className={'w-40'} onClick={handleReset} />
                </div>
            </SectionContainer>

            <SectionContainer className="gap-3 flex flex-col relative min-h-40">
                {!debounceLoading && !isLoading && role == 'ADMIN' && <Button label="Add New Sub Category" className={'w-60 self-end'} onClick={() => router.push('/admin/sub-categories/add')} />}
                {debounceLoading || isLoading ? <Loading /> :
                    <Table
                        columns={SUB_CAT_COLUMN}
                        data={data.data}
                        enablePagination
                        paginationMetadata={data.meta}
                        onPaginationChanged={(pageNumber) => handlePaginationChanged(pageNumber)}
                        actionColumns={role == 'ADMIN' ? [
                            { element: <TableActionButton type="VIEW" />, onClick: (mainCategory: SubcategoryData) => { alert('View' + JSON.stringify(mainCategory)) } },
                            { element: <TableActionButton type="EDIT" />, onClick: (mainCategory: SubcategoryData) => { router.push(`/admin/sub-categories/${mainCategory.uuid}/edit`) } },
                            { element: <TableActionButton type="DELETE" />, onClick: (mainCategory: SubcategoryData) => { alert('Delete' + JSON.stringify(mainCategory)) } }
                        ] : []}
                    />
                }
            </SectionContainer>
        </>
    )
}

export default SubCategoryListing