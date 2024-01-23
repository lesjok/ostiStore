import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { useAppDispatch, useAppSelector } from '../redux/dispatch'
import { logoutUser, setCurrentUser } from '../redux/slice'
import { IFormValues, IProduct } from '../types/type'
import { useNavigate } from 'react-router-dom'
import { auth, db } from './firebase.config'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const useAuthentication = () => {
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector((state) => state.auth.user)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
    return () => unsubscribe()
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

const useLiked = (productId: number | null) => {
  const currentUser = useAppSelector((state) => state.auth.user)
  const navigate = useNavigate()
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    if (!currentUser || !productId) {
      return
    }

    const unsubscribe = onSnapshot(
      doc(db, 'users', currentUser.uid),
      (snapshot) => {
        const data = snapshot.data()
        if (data && data.bookmarks) {
          setIsLiked(
            data.bookmarks.some((item: IProduct) => item.id === productId),
          )
        }
      },
    )
    return () => {
      unsubscribe()
    }
  }, [currentUser, productId])

  const toggleIsLiked = async (product: IProduct | undefined) => {
    if (!currentUser) {
      navigate('/login')
      return
    }
    const userDocRef = doc(db, 'users', currentUser.uid)
    try {
      await setDoc(userDocRef, {}, { merge: true })

      await updateDoc(userDocRef, {
        bookmarks: isLiked
          ? arrayRemove({
              id: product?.id,
              title: product?.title,
              price: product?.price,
              image: product?.image,
              description: product?.description,
            })
          : arrayUnion({
              id: product?.id,
              title: product?.title,
              price: product?.price,
              image: product?.image,
              description: product?.description,
            }),
      })
      setIsLiked(!isLiked)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error toggling like:', error)
    }
  }

  return {
    isLiked,
    toggleIsLiked,
  }
}

const useFavouriteList = () => {
  const currentUser = useAppSelector((state) => state.auth.user)

  const updateList = async (products: IProduct[]) => {
    if (!currentUser) {
      return
    }

    try {
      await updateDoc(doc(db, 'users', currentUser.uid), {
        bookmarks: products,
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error updating document:', error)
    }
  }

  return { updateList }
}

const useLikedProducts = () => {
  const currentUser = useAppSelector((state) => state.auth.user)
  const [likedProducts, setLikedProducts] = useState<IProduct[]>([])

  useEffect(() => {
    if (!currentUser) {
      return
    }

    const unsubDoc = onSnapshot(
      doc(db, 'users', currentUser?.uid),
      (doc) => {
        setLikedProducts(doc.data()?.bookmarks.slice())
      },
      (error) => {
        alert(error)
        setLikedProducts([])
      },
    )

    return () => unsubDoc()
  }, [currentUser])

  return { likedProducts }
}

export {
  useAuthentication,
  useLikedProducts,
  useLogin,
  useRegister,
  useLiked,
  useFavouriteList,
}
