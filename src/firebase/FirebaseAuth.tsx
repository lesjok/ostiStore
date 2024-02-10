import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { useAppDispatch, useAppSelector } from '../redux/dispatch'
import { userLoggedIn, userLoggedOut } from '../redux/actions'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import type { IFormValues } from '../types/type'
import { useNavigate } from 'react-router-dom'
import { auth, db } from './firebase.config'
import { useEffect, useState } from 'react'
import { RootState } from '../redux/store'
import { useForm } from 'react-hook-form'

const useAuthentication = () => {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const getUser = (state: RootState) => state.auth.user
  const isLogin = useAppSelector(getUser)
  const navigate = useNavigate()

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setIsLoading(true)
      if (!user) {
        dispatch(userLoggedOut())
        return
      }
      onSnapshot(doc(db, 'users', user.uid), () => {
        dispatch(
          userLoggedIn({
            email: user.email,
            uid: user.uid,
          }),
        )
      })
      setIsLoading(false)
    })
  }, [dispatch])

  const logout = () => {
    signOut(auth)
    dispatch(userLoggedOut())
    navigate('/')
  }
  return { isLogin, auth, logout, isLoading }
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
    } catch (error) {
      alert(error)
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
      alert(error)
    }
  }
  return {
    register,
    handleSubmit: handleSubmit(handleLogin),
  }
}

export { useAuthentication, useLogin, useRegister }
