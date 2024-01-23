import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { user } from './slice'
import { api } from './api'

export const rootReducer = combineReducers({
  auth: user,
  [api.reducerPath]: api.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
