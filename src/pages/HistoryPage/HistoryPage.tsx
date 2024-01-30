import { deleteHistory, useAuthState } from '../../firebase/FirebaseHistory'
import Spinner from '../../components/Spinner/Spinner'
import { useGetProductsQuery } from '../../redux/api'
import type { IUser } from '../../types/type'
import React, { useState } from 'react'
import './HistoryPage.css'

interface HistoryItem {
  id: string
  url: string
  query: string
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [, setUser] = useState<IUser | null>(null)
  const { isLoading } = useGetProductsQuery()

  useAuthState(setUser, setHistory)
  const handleDelURL = (id: string) => {
    deleteHistory(id)
    setHistory((prev) => prev.filter((item) => item.id !== id))
  }

  return isLoading ? (
    <Spinner />
  ) : history.length >= 1 ? (
    <section className="history">
      <ul className="history__list">
        {history.map((item) => (
          <li key={item.id} className="history__item">
            <a className="history__link" href={`/search?query=${item.query}`}>
              {item.query}
            </a>
            <button
              className="history__del"
              type="button"
              onClick={() => handleDelURL(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  ) : (
    <div className="not-found">
      <h3 className="not-found__message">Nothing was found</h3>
    </div>
  )
}
