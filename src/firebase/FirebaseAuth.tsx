import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { useAppDispatch, useAppSelector } from '../redux/dispatch'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { logoutUser, setCurrentUser } from '../redux/slice'
import type { IFormValues } from '../types/type'
import { useNavigate } from 'react-router-dom'
import { auth, db } from './firebase.config'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

const useAuthentication = () => {
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector((state) => state.auth.user)
  const navigate = useNavigate()

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (!user) {
        dispatch(setCurrentUser(null))
        return
      }
      onSnapshot(doc(db, 'users', user.uid), () => {
        dispatch(
          setCurrentUser({
            email: user.email,
            uid: user.uid,
          }),
        )
      })
    })
  }, [dispatch])

  const logout = () => {
    signOut(auth)
    dispatch(logoutUser())
    navigate('/')
  }
  return { isLogin, auth, logout }
}

const useRegister = () => {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<IFormValues>()

  const handleRegister = async (data: IFormValues) => {
    try {
      const person = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      )
      await setDoc(doc(db, 'users', person.user.uid), {
        email: data.email,
        bookmarks: [],
        history: [],
      })
      navigate('/')
    } catch (e) {
      alert((e as Error).message)
    }
  }

  return {
    register,
    handleSubmit: handleSubmit(handleRegister),
  }
}

const useLogin = () => {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<IFormValues>()
  const handleLogin = async (data: IFormValues) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
      navigate('/')
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Login error in Firebase:', error)
    }
  }
  return {
    register,
    handleSubmit: handleSubmit(handleLogin),
  }
}

export { useAuthentication, useLogin, useRegister }
