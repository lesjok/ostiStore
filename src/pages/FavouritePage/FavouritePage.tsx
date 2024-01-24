import { useLikedProducts } from '../../firebase/FirebaseFavourites'
import CardItem from '../../components/CardItem/CardItem'
import '../MainPage/MainPage.css'
import React from 'react'

const FavouritePage = () => {
  const { likedProducts } = useLikedProducts()

  return (
    <ul className="cards">
      {likedProducts?.map((product) => (
        <li key={product.id} className="cards__item">
          <CardItem
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

export default FavouritePage
