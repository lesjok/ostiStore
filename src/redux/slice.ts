import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { userLoggedIn, userLoggedOut } from './actions'
import { auth } from '../firebase/firebase.config'
import type { IUser } from '../types/type'

type InitialState = {
  authorize: boolean
  user: IUser | null
}

const initialState: InitialState = {
  authorize: Boolean(auth),
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLoggedIn, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload
      })
      .addCase(userLoggedOut, (state) => {
        state.user = null
      })
  },
})
export const user = userSlice.reducer
