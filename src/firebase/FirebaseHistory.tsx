import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { IUser, IHistory } from '../types/type'
import { auth, db } from './firebase.config'

export const useAuthState = (
  setUser: Dispatch<SetStateAction<IUser | null>>,
  setHistory: Dispatch<SetStateAction<IHistory[]>>,
) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser)

      if (authUser) {
        const unsubscribeHistory = getHistory(setHistory)

        return () => {
          unsubscribe()
          if (unsubscribeHistory) {
            unsubscribeHistory()
          }
        }
      }
    })

    return unsubscribe
  }, [setHistory])
}

const getHistory = (setHistory: Dispatch<SetStateAction<IHistory[]>>) => {
  const user = auth.currentUser

  if (!user) {
    return
  }

  const collectionRef = collection(db, 'searchHistory')
  const userQuery = query(collectionRef, where('userId', '==', user.uid))

  return onSnapshot(userQuery, (snapshot) => {
    const history = snapshot.docs.map((historyDoc) => ({
      id: historyDoc.id,
      query: historyDoc.data().query,
      url: historyDoc.data().url || '',
    }))

    setHistory(history)
  })
}

export const saveHistory = async (query: string) => {
  const user = auth.currentUser

  if (!user) {
    return
  }

  const historyCollection = collection(db, 'searchHistory')
  const encodedQuery = encodeURIComponent(query)
  const newSearch = {
    query,
    userId: user.uid,
    url: `${encodedQuery}`,
  }

  try {
    await addDoc(historyCollection, newSearch)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Ошибка при сохранении в историю поиска:', error)
  }
}

export const deleteHistory = async (queryId: string) => {
  const user = auth.currentUser

  if (!user) {
    return
  }

  const searchHistoryDoc = doc(db, 'searchHistory', queryId)

  try {
    await deleteDoc(searchHistoryDoc)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Ошибка при удалении из истории поиска:', error)
  }
}
