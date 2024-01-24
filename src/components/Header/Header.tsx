import { useAuthentication } from '../../firebase/FirebaseAuth'
import logo from '../../assets/images/grow.svg'
import { Link } from 'react-router-dom'
import Search from '../Search/Search'
import React from 'react'
import './Header.css'

export default function Header() {
  const { isLogin, logout } = useAuthentication()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="/">
          <img src={logo} alt="logo" title="Fake Shop" className="nav__logo" />
        </Link>
        <h2 className="nav__head">Osti Shop</h2>
        <div className="nav__right">
          {isLogin && (
            <Link to="/favourites" className="nav__link">
              favourites
            </Link>
          )}
          <Search />
          {isLogin ? (
            <Link to="/" className="nav__btn" onClick={handleLogout}>
              log out
            </Link>
          ) : (
            <Link to="/login" className="nav__btn">
              log in
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
