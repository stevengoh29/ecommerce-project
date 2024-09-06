'use client'

import Button from '@/components/button/button'
import Container from '@/components/container/content-wrapper.container'
import DropdownInput, { Option } from '@/components/input/dropdown-input'
import Table from '@/components/table/table'
import { ChangeEvent, useEffect, useState } from 'react'

import BaseTextInput from '@/components/input/base-text-input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useGetUserStatusEnum, useGetUsers } from '@/hooks/users/user.query'
import TableActionButton from '@/components/button/table-action-button'
import { UserData } from '@/services/user/user.service'
import { useFilter } from '@/hooks/common/use-filter.hook'

const USER_TABLE_COLUMN = [
    { key: 'uuid', label: 'User Id', width: 'w-32' },
    { key: 'username', label: 'Username', width: 'w-32' },
    { key: 'firstName', label: 'First Name', width: 'w-32' },
    { key: 'email', label: 'Email', width: 'w-48' },
    { key: 'phoneNumber', label: 'Phone Number', width: 'w-32' }
]

const UserPage = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    const { filterOptions, handleCheckedChange, handleOptionChanged, handlePaginationChanged, handleReset, handleTextChange } = useFilter({
        page: searchParams.get('page') ?? '1',
        username: searchParams.get('username') ?? '',
        phoneNumber: searchParams.get('phoneNumber') ?? '',
        status: searchParams.get('status') ?? ''
    })

    const { data } = useGetUsers()
    const { data: status } = useGetUserStatusEnum()

    if (data == undefined) return null

    return (
        <Container title='User Listing'>
            <div className='py-3 px-5 rounded-lg w-full shadow-main mb-3'>
                <div className='flex lg:flex-row flex-col w-full lg:gap-5 gap-3'>
                    <BaseTextInput label='Username' value={filterOptions['username'] ?? ''} onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextChange('username', e.target.value)} onReset={() => handleTextChange('username', '')} />
                    <BaseTextInput label='Phone Number' value={filterOptions['phoneNumber'] ?? ''} onChange={(e: ChangeEvent<HTMLInputElement>) => handleTextChange('phoneNumber', e.target.value)} onReset={() => handleTextChange('phoneNumber', '')} />
                    <DropdownInput
                        label='Status'
                        options={status ?? []}
                        value={status?.filter((value) => { return value.value === filterOptions['status'] }).at(0)}
                        onSelectedChanged={(option) => handleOptionChanged('status', option)}
                    />
                </div>

                <div className='flex mt-3 flex-wrap justify-end gap-3'>
                    <Button label={'Reset'} className={'w-40'} onClick={handleReset} />
                </div>
            </div>
            <div className='px-5 py-5 rounded-lg w-full max-w-full shadow-main'>
                <Table
                    columns={USER_TABLE_COLUMN}
                    data={data.data}
                    enablePagination
                    paginationMetadata={data.meta}
                    onPaginationChanged={(pageNumber) => handlePaginationChanged(pageNumber)}
                    actionColumns={[
                        { element: <TableActionButton type="VIEW" />, onClick: (user: UserData) => { alert('View' + JSON.stringify(user)) } },
                        { element: <TableActionButton type="EDIT" />, onClick: (user: UserData) => { router.push(`/admin/users/${user.uuid}/edit`) } },
                        { element: <TableActionButton type="DELETE" />, onClick: (user: UserData) => { } }
                    ]}
                />
            </div>
        </Container >
    )
}

export default UserPage
