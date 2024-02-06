import {
  MainPage,
  FavouritePage,
  LayoutPage,
  LoginPage,
  RegistrationPage,
  ProductPage,
  SearchPage,
  HistoryPage,
} from './router/AppRouter'
import MyErrorBoundary from './components/MyErrorBoundary/MyErrorBoundary'
import { ProtectedRoute } from './router/ProtectedRoute'
import Spinner from './components/Spinner/Spinner'
import { commands } from './console API/commands'
import { Route, Routes } from 'react-router-dom'
import { show } from './console API/console'
import { store } from './redux/store'
import { Suspense } from 'react'
import React from 'react'
import './App.css'

export function App() {
  return (
    <MyErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route element={<LayoutPage />} path="/">
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route index element={<MainPage />} />
            <Route
              path="/favourites"
              element={
                <ProtectedRoute>
                  <FavouritePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute>
                  <HistoryPage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </MyErrorBoundary>
  )
}

declare global {
  interface Window {
    show: (commandString: string) => void
  }
}

window.show = show(store.dispatch)
window.show(commands.init)
