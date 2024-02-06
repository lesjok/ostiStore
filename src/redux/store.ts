import { consoleListenerMiddleware } from '../middlewares/consoleMiddleware'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authMiddleware } from '../middlewares/authMiddleware'
import { featureFlagApi } from '../shared/FeatureFlagApi'
import { user } from './slice'
import { api } from './api'

export const rootReducer = combineReducers({
  auth: user,
  [api.reducerPath]: api.reducer,
  [featureFlagApi.reducerPath]: featureFlagApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(consoleListenerMiddleware.middleware)
      .concat(authMiddleware.middleware)
      .concat(api.middleware)
      .concat(featureFlagApi.middleware),

  devTools: true,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
