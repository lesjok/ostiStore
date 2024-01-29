import { useLikedProducts } from '../../firebase/FirebaseFavourites'
import CardItem from '../../components/CardItem/CardItem'
import Spinner from '../../components/Spinner/Spinner'
import { useGetProductsQuery } from '../../redux/api'
import '../SearchPage/SearchPage.css'
import React from 'react'

const FavouritePage = () => {
  const { likedProducts } = useLikedProducts()
  const { isLoading } = useGetProductsQuery()

  return isLoading ? (
    <Spinner />
  ) : likedProducts.length >= 1 ? (
    <ul className="cards">
      {likedProducts?.map((product) => (
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

export default FavouritePage
