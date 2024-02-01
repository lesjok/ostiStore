import { createAction } from '@reduxjs/toolkit'
import { IUser } from '../types/type'

export const USER_LOGGED_IN = 'USER_LOGGED_IN'
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT'

export const userLoggedIn = createAction<IUser>(USER_LOGGED_IN)
export const userLoggedOut = createAction(USER_LOGGED_OUT)
