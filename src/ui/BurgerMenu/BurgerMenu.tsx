import BurgerMenuIcon from '../../assets/images/menu-burger.png'
import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import './BurgerMenu.css'

const BurgerMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const linkRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false)
    }
  }

  const handleNavLinkClick = () => {
    setMenuOpen(false)
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div className="burger-menu" ref={menuRef}>
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
        <div className="burger-menu__items" ref={linkRef}>
          <NavLink
            to="/history"
            onClick={handleNavLinkClick}
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
            onClick={handleNavLinkClick}
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
