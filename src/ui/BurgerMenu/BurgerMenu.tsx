import BurgerMenuIcon from '../../assets/images/menu-burger.png'
import { NavLink } from 'react-router-dom'
import React, { useState } from 'react'
import './BurgerMenu.css'

const BurgerMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false)

  return (
    <div className="burger-menu">
      <button
        type="button"
        className="burger-menu__btn"
        onClick={() => setMenuOpen(!isMenuOpen)}
      >
        <img
          src={BurgerMenuIcon}
          alt="menu-burger"
          className="burger-menu__icon"
        />
      </button>
      {isMenuOpen && (
        <div className="burger-menu__items">
          <NavLink
            to="/history"
            onClick={() => setMenuOpen(!isMenuOpen)}
            className={({ isActive }) =>
              isActive
                ? 'burger-menu__link burger-menu__link_active'
                : 'burger-menu__link'
            }
          >
            history
          </NavLink>
          <NavLink
            to="/favourites"
            onClick={() => setMenuOpen(!isMenuOpen)}
            className={({ isActive }) =>
              isActive
                ? 'burger-menu__link burger-menu__link_active'
                : 'burger-menu__link'
            }
          >
            favourites
          </NavLink>
        </div>
      )}
    </div>
  )
}

export default BurgerMenu
