import { useRegister } from '../../firebase/FirebaseAuth'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import './RegistrationPage.css'

const RegistrationPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const { register, handleSubmit } = useRegister()

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
          className="form__btn_register"
          onClick={checkValidation}
        >
          Register
        </button>
        <div className="form__login">
          <div>Already have an account?</div>
          <Link className="form__btn_log-in" to="/login">
            Log in
          </Link>
        </div>
      </form>
    </div>
  )
}

export default RegistrationPage
