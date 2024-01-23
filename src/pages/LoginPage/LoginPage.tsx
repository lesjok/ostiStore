import { useLogin } from '../../firebase/Firebase'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import './LoginPage.css'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const { register, handleSubmit } = useLogin()

  const checkValidation = () => {
    if (!email.trim()) {
      setEmailError('Email is required')
    } else {
      setEmailError('')
    }
    if (!password.trim()) {
      setPasswordError('Password is required')
    } else {
      setPasswordError('')
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <label className="form__label">Email:</label>
        <input
          type="text"
          className="form__input"
          value={email}
          {...register('email')}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className="form__error">{emailError}</p>}
        <label className="form__label">Password:</label>
        <input
          type="password"
          className="form__input"
          value={password}
          {...register('password')}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p className="form__error">{passwordError}</p>}
        <button
          type="submit"
          className="form__btn_login"
          onClick={checkValidation}
        >
          log in
        </button>
        <div className="form__registration">
          <div>Don&apos;t have an account?</div>
          <Link className="form__btn_registration" to="/registration">
            Registration
          </Link>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
