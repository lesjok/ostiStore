import {
  MainPage,
  FavouritePage,
  LayoutPage,
  LoginPage,
  RegistrationPage,
  ProductPage,
} from './router/AppRouter'
import MyErrorBoundary from './components/MyErrorBoundary/MyErrorBoundary'
import { ProtectedRoute } from './router/ProtectedRoute'
import { Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'
import React from 'react'
import './App.css'

export function App() {
  return (
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<LayoutPage />} path="/">
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route
              path="/favourites"
              element={
                <ProtectedRoute>
                  <FavouritePage />
                </ProtectedRoute>
              }
            />
            <Route index element={<MainPage />} />
          </Route>
        </Routes>
      </Suspense>
    </MyErrorBoundary>
  )
}
