import React from 'react'

export const MainPage = React.lazy(() => import('../pages/MainPage/MainPage'))

export const FavouritePage = React.lazy(
  () => import('../pages/FavouritePage/FavouritePage'),
)

export const HistoryPage = React.lazy(
  () => import('../pages/HistoryPage/HistoryPage'),
)

export const LayoutPage = React.lazy(
  () => import('../pages/LayoutPage/LayoutPage'),
)

export const LoginPage = React.lazy(
  () => import('../pages/LoginPage/LoginPage'),
)

export const RegistrationPage = React.lazy(
  () => import('../pages/RegistrationPage/RegistrationPage'),
)

export const ProductPage = React.lazy(
  () => import('../pages/ProductPage/ProductPage'),
)
