import githubLogo from '../../assets/images/github-mark-white.png'
import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      2024 Osti Store, Inc. All rights reserved.
      <a
        href="https://github.com/lesjok/ostiStore"
        target="_blank"
        rel="noreferrer"
      >
        <img src={githubLogo} alt="gitHub link" className="footer__img" />
      </a>
    </footer>
  )
}
