import CardItem from '../../components/CardItem/CardItem'
import { useSearchProductsQuery } from '../../redux/api'
import { useLocation } from 'react-router-dom'
import './SearchPage.css'
import React from 'react'

const SearchPage = () => {
  const { search: searchParams } = useLocation()
  const query = new URLSearchParams(searchParams).get('query') || ''
  const { data: products = [] } = useSearchProductsQuery(query)

  return products.length >= 1 ? (
    <ul className="cards">
      {products?.map((product) => (
        <li key={product.id} className="cards__item">
          <CardItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
            product={product}
          />
        </li>
      ))}
    </ul>
  ) : (
    <div className="not-found">
      <h3 className="not-found__message">Nothing was found</h3>
    </div>
  )
}
export default SearchPage
