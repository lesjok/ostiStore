import React, { useState, ChangeEvent, KeyboardEvent } from 'react'
import { useSearchProductsQuery } from '../../redux/api'
import debounce from '../../hooks/debounce'
import { IProduct } from '../../types/type'
import { Link } from 'react-router-dom'
import './Search.css'

const Search = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const { data: productsFromQuery = [] } = useSearchProductsQuery(searchTerm)

  const debouncedSearch = debounce((term: string) => {
    setSearchTerm(term)
  }, 100)

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }
  const handleSearch = () => {
    // eslint-disable-next-line no-console
    console.log(searchTerm)
  }
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProducts(productsFromQuery)
    debouncedSearch(e.target.value)
  }
  return (
    <div className="search">
      <input
        type="text"
        value={searchTerm}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
        onKeyDown={handleKeyPress}
        className="search__input"
      />
      <button onClick={handleSearch} className="search__btn">
        Search
      </button>
      {searchTerm && (
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
        </ul>
      )}
    </div>
  )
}
export default Search
