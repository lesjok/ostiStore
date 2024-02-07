import { deleteHistory, useAuthState } from '../../firebase/FirebaseHistory'
import Spinner from '../../components/Spinner/Spinner'
import { useGetProductsQuery } from '../../redux/api'
import { FixedSizeList as List } from 'react-window' //as используется для удобства использования переменной в разметке
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
      <List
        width={1400}
        height={550}
        itemCount={history.length}
        itemSize={45}
        style={{
          position: 'initial',
          width: '100%',
          height: '100%',
          willChange: 'initial',
        }}
      >
        {({ index }) => (
          <li key={history[index].id} className="history__item">
            <a
              className="history__link"
              href={`/search?query=${history[index].query}`}
            >
              {history[index].query}
            </a>
            <button
              className="history__del"
              type="button"
              onClick={() => handleDelURL(history[index].id)}
            >
              Delete
            </button>
          </li>
        )}
      </List>
    </section>
  ) : (
    <div className="not-found">
      <h3 className="not-found__message">Nothing was found</h3>
    </div>
  )
}
