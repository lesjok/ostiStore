import { useAuthentication } from '../../firebase/FirebaseAuth'
import { Link, NavLink } from 'react-router-dom'
import logo from '../../assets/images/grow.svg'
import CustomLink from '../../ui/CustomLink'
import Search from '../Search/Search'
import PropTypes from 'prop-types'
import React from 'react'
import './Header.css'

interface Props {
  toggleDarkMode: () => void
}

const Header = ({ toggleDarkMode }: Props) => {
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
          <label className="nav__checkbox checkbox">
            <input type="checkbox" onChange={toggleDarkMode} />
            <span
              className="checkbox__switch"
              data-label-on="On"
              data-label-off="Off"
            ></span>
          </label>
          <Search />
          {isLogin ? (
            <CustomLink to="/" onClick={handleLogout}>
              Log out
            </CustomLink>
          ) : (
            <>
              <CustomLink to="/login">Login</CustomLink>
              <CustomLink to="/registration">Register</CustomLink>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

Header.propTypes = {
  toggleDarkMode: PropTypes.func.isRequired,
}

export default Header
