'use client'

import { UserData } from '@/services/user/user.service'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: UserData = {
    uuid: '',
    username: '',
    firstName: '',
    lastName: '',
    phoneCode: '',
    phoneNumber: '',
    imageUrl: '',
    role: '',
    storeId: ''
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        set: (state, action: PayloadAction<UserData>) => {
            return { ...state, ...action.payload }
        },
        reset: _ => {
            return initialState
        }
    }
})

export const { reset, set } = userSlice.actions
export default userSlice.reducer