import CardItem from '../../components/CardItem/CardItem'
import { useGetProductsQuery } from '../../redux/api'
import React from 'react'
import './MainPage.css'

const MainPage = () => {
  const { data: products } = useGetProductsQuery()

  return (
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
  )
}
export default MainPage
