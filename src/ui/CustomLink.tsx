import React, { ReactNode } from 'react'
import './CustomLink.css'

interface Props {
  to: string
  children: ReactNode
  onClick?: () => void
  primary?: boolean
  size?: 'small' | 'medium' | 'large'
  label?: string
}

const CustomLink = ({
  to,
  children,
  onClick,
  primary = true,
  size = 'medium',
  label = 'Link',
}: Props) => {
  const mode = primary ? 'nav__btn--primary' : 'nav__btn--secondary'

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <a
      href={to}
      className={['nav__btn', `nav__btn--${size}`, mode].join(' ')}
      onClick={handleClick}
    >
      {children ? children : label}
    </a>
  )
}

export default CustomLink
