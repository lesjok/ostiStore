import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from '../pages/MainPage/MainPage'
import React from 'react'

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
