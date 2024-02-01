import React from 'react'
import './Spinner.css'

interface Props {
  size?: 'small' | 'medium' | 'large'
}

export default function Spinner({ size = 'medium' }: Props) {
  return (
    <div className="spinner">
      <div className={['spinner_img', `spinner_img--${size}`].join(' ')}></div>
    </div>
  )
}
