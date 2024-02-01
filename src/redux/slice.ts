import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { auth } from '../firebase/firebase.config'
import type { IUser } from '../types/type'
import * as actions from './actions'

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
      .addCase(actions.userLoggedIn, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload
      })
      .addCase(actions.userLoggedOut, (state) => {
        state.user = null
      })
  },
})
export const user = userSlice.reducer
