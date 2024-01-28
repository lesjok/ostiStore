import { useAuthentication } from '../../firebase/FirebaseAuth'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/images/grow.svg'
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
        <Link to="/" className="header__link">
          <img src={logo} alt="logo" title="Fake Shop" className="nav__logo" />
          <h2 className="nav__head">Osti Shop</h2>
        </Link>
        <div className="nav__right">
          {isLogin && (
            <>
              <NavLink
                to="/history"
                className={({ isActive }) =>
                  isActive ? 'nav__link nav__link_active' : 'nav__link'
                }
              >
                history
              </NavLink>
              <NavLink
                to="/favourites"
                className={({ isActive }) =>
                  isActive ? 'nav__link nav__link_active' : 'nav__link'
                }
              >
                favourites
              </NavLink>
            </>
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
