import { deleteHistory, useAuthState } from '../../firebase/FirebaseHistory'
import { IUser } from '../../types/type'
import React, { useState } from 'react'
import './HistoryPage.css'

interface HistoryItem {
  id: string
  url: string
  query: string
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [user, setUser] = useState<IUser | null>(null)

  useAuthState(setUser, setHistory)
  const handleDelURL = (id: string) => {
    deleteHistory(id)
    setHistory((prev) => prev.filter((item) => item.id !== id))
  }

  return (
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
  )
}
