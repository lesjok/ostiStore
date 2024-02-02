import React, { useState, KeyboardEvent, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { saveHistory } from '../../firebase/FirebaseHistory'
import { useSearchProductsQuery } from '../../redux/api'
import type { IProduct } from '../../types/type'
import debounce from '../../hooks/debounce'
import { Link } from 'react-router-dom'
import './Search.css'

const Search = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [searchParams] = useSearchParams()
  const query = searchParams.get('query')
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedValue = debounce<string>(searchTerm, 700)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const { data: productsFromQuery = [] } =
    useSearchProductsQuery(debouncedValue)
  const navigate = useNavigate()

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    setProducts(productsFromQuery)
    setShowSuggestions(true)
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const handleSearch = () => {
    const searchUrl = `/search?query=${searchTerm}`
    navigate(searchUrl)
    saveHistory(searchTerm)
  }

  useEffect(() => {
    setSearchTerm(query || '')
    setShowSuggestions(false)
  }, [query])

  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false)
    }, 300)
  }

  return (
    <div className="search">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
        className="search__input"
        onBlur={handleBlur}
        title="Search"
      />
      <a onClick={handleSearch} className="nav__btn">
        Search
      </a>
      {searchTerm && showSuggestions && (
        <ul className="search__suggestions">
          {products.map((product, index) => (
            <li className="suggestion" key={index}>
              <Link
                className="suggestion__link"
                to={`/product/${product.id}`}
                onClick={() => setSearchTerm('')}
              >
                {product.title}
              </Link>
            </li>
          ))}
          {products.length < 1 && (
            <div className="search__nothing">Nothing was found</div>
          )}
        </ul>
      )}
    </div>
  )
}
export default Search
