import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { useAppSelector } from '../redux/dispatch'

import { useNavigate } from 'react-router-dom'
import type { IProduct } from '../types/type'
import { useEffect, useState } from 'react'
import { db } from './firebase.config'

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

      const productData = {
        id: product?.id,
        title: product?.title,
        price: product?.price,
        image: product?.image,
        description: product?.description,
      }

      await updateDoc(userDocRef, {
        bookmarks: isLiked ? arrayRemove(productData) : arrayUnion(productData),
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

export { useLikedProducts, useLiked }
