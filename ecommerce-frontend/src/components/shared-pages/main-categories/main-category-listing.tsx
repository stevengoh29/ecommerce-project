'use client'

import Button from "@/components/button/button"
import TableActionButton from "@/components/button/table-action-button"
import SectionContainer from "@/components/container/section-wrapper.container"
import BaseTextInput from "@/components/input/base-text-input"
import CheckboxInput from "@/components/input/checkbox-input"
import Table, { TableColumnType } from "@/components/table/table"
import { DEBOUNCED_TIMEOUT } from "@/core/constant/app.constant"
import { useGetMainCategories } from "@/hooks/category/main-category.query"
import useDebounceValue from "@/hooks/common/use-debounced-value.hook"
import useDialog from "@/hooks/common/use-dialog.hook"
import { useFilter } from "@/hooks/common/use-filter.hook"
import { useAppSelector } from "@/hooks/common/use-redux.hook"
import mainCategoryService, { MainCategoryData } from "@/services/categories/main-category.service"
import { useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent } from "react"
import toast from "react-hot-toast"

const MAIN_CAT_COLUMN = [
    { key: 'uuid', label: '# Id', width: 'w-32', type: ('LINK' as TableColumnType) },
    { key: 'imagePath', label: 'Image', width: 'w-9', type: ('IMAGE' as TableColumnType) },
    { key: 'name', label: 'Category Name' },
    { key: 'description', label: 'Category Description', width: 'w-64' },
    { key: 'isInactive', label: 'Is Inactive?', width: 'w-32', type: ('BOOL' as TableColumnType) },
]

const MainCategoryListing = () => {
    const searchParams = useSearchParams()
    const { push } = useRouter()
    const dialog = useDialog()

    const { role } = useAppSelector(root => root.users)

    const { filterOptions, handleCheckedChange, handlePaginationChanged, handleReset, handleTextChange } = useFilter({
        page: searchParams.get('page') ?? '1',
        name: searchParams.get('name') ?? ''
    })

    const { debouncedValue } = useDebounceValue(filterOptions, DEBOUNCED_TIMEOUT)
    const { data, isPending, refetch } = useGetMainCategories(debouncedValue)

    const handleDelete = (mainCategory: MainCategoryData) => {
        dialog.confirm({
            title: 'Confirmation',
            message: `Are you sure you want to delete ${mainCategory.name}?`,
            onConfirm: async () => {
                await mainCategoryService.delete(mainCategory.uuid)
                refetch()
                toast.success('Main Category deleted successfully')
            }
        })
    }

    return (
        <>
            <SectionContainer>
                <div className='flex flex-col w-full lg:gap-2 gap-2'>
                    <BaseTextInput
                        label='Category Name'
                        value={filterOptions['name'] ?? ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextChange('name', e.target.value)}
                        onReset={() => handleTextChange('name', '')}
                    />

                    <CheckboxInput label="Include inactive categories" checked={filterOptions['includeInactive'] ?? false} onChange={(e) => handleCheckedChange('includeInactive')} />
                </div>

                <div className='flex mt-3 flex-wrap justify-end gap-3'>
                    <Button label={'Reset'} className={'w-40'} onClick={handleReset} />
                </div>
            </SectionContainer>

            <SectionContainer className="gap-3 flex flex-col">
                {role == 'ADMIN' && <Button label="Add New Main Category" className={'w-60 self-end'} onClick={() => push('/admin/main-categories/add')} />}
                {
                    data?.data == undefined || isPending ? <p>Loading Data...</p> : (
                        <Table
                            columns={MAIN_CAT_COLUMN}
                            data={data.data}
                            enablePagination
                            paginationMetadata={data.meta}
                            onPaginationChanged={(pageNumber) => handlePaginationChanged(pageNumber)}
                            actionColumns={role === 'ADMIN' ? [
                                { element: <TableActionButton type="VIEW" />, onClick: (mainCategory: MainCategoryData) => { alert('View' + JSON.stringify(mainCategory)) } },
                                { element: <TableActionButton type="EDIT" />, onClick: (mainCategory: MainCategoryData) => { push(`/admin/main-categories/${mainCategory.uuid}/edit`) } },
                                { element: <TableActionButton type="DELETE" />, onClick: (mainCategory: MainCategoryData) => { handleDelete(mainCategory) } }
                            ] : []}
                        />
                    )
                }
            </SectionContainer>
        </>
    )
}

export default MainCategoryListing