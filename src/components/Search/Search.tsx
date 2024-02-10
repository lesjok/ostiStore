import React, { useState, KeyboardEvent, useEffect } from 'react'
import { savedHistory } from '../../firebase/FirebaseHistory'
import { useSearchProductsQuery } from '../../redux/api'
import type { IProduct } from '../../types/type'
import { useNavigate } from 'react-router-dom'
import debounce from '../../hooks/debounce'
import { Link } from 'react-router-dom'
import './Search.css'

const Search = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const query = new URLSearchParams(location.search).get('query') || ''
  const [searchTerm, setSearchTerm] = useState(query)
  const debouncedValue = debounce(searchTerm, 700)
  const [isShowSuggestions, setIsShowSuggestions] = useState(false)
  const { data: productsFromQuery = [] } =
    useSearchProductsQuery(debouncedValue)
  const navigate = useNavigate()

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    setProducts(productsFromQuery)
    setIsShowSuggestions(true)
    if (event.key === 'Enter') {
      handleSearch()
    }
  }
  /* переход из истории поиска сюда происходит без перезагрузки страницы, поэтому нужна подписка на изменение query,
   чтобы поле поиска заполнилось текстом из query, с useState так не получается */
  useEffect(() => {
    setSearchTerm(query)
  }, [query])

  const handleSearch = () => {
    const searchUrl = `/search?query=${searchTerm}`
    navigate(searchUrl)
    setIsShowSuggestions(false)
    savedHistory(searchTerm)
  }

  return (
    <div className="search">
      <input
        type="text"
        value={searchTerm}
        onFocus={() => setIsShowSuggestions(true)}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
        className="search__input"
        onBlur={() => setTimeout(() => setIsShowSuggestions(false), 100)}
        title="Search"
        placeholder="Search"
      />
      <a onClick={handleSearch} className="nav__btn">
        Search
      </a>
      {searchTerm && isShowSuggestions && (
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
