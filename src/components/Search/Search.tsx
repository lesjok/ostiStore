import { saveHistory } from '../../firebase/FirebaseHistory'
import { useSearchProductsQuery } from '../../redux/api'
import React, { useState, KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import debounce from '../../hooks/debounce'
import { IProduct } from '../../types/type'
import { Link } from 'react-router-dom'
import './Search.css'

const Search = () => {
  const [products, setProducts] = useState<IProduct[]>([])
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
    setSearchTerm('')
  }

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
      />
      <button onClick={handleSearch} className="search__btn">
        Search
      </button>
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
