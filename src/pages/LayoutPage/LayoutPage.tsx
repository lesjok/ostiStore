import { useTheme } from '../../contexts/ThemeContext'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { Outlet } from 'react-router-dom'
import './LayoutPage.css'
import React from 'react'

export default function LayoutPage() {
  const { darkMode, toggleDarkMode } = useTheme()
  const headerTheme = `${darkMode ? 'dark' : ''}`

  return (
    <div className="container">
      <Header toggleDarkMode={toggleDarkMode} />
      <main className={`main ${headerTheme}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
