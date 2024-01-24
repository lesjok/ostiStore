import { auth } from '../firebase/firebase.config'
import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../types/type'

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
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload
    },
    logoutUser: (state) => {
      state.user = null
    },
  },
})

export const { setCurrentUser, logoutUser } = userSlice.actions
export const user = userSlice.reducer
