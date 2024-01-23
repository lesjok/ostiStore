import { useAuthentication, useLiked } from '../../firebase/Firebase'
import { IProduct } from '../../types/type'
import { Link } from 'react-router-dom'
import React from 'react'
import './CardItem.css'

interface CardsItems {
  id: number
  price: number
  title: string
  image: string
  product: IProduct
}

export default function CardItem({
  id,
  price,
  title,
  image,
  product,
}: CardsItems) {
  const { isLiked, toggleIsLiked } = useLiked(id)
  const { isLogin } = useAuthentication()
  const cardLikeButtonClassName = isLiked
    ? 'card__like card__like-active'
    : 'card__like'

  const likeHandler = () => {
    toggleIsLiked(product)
  }

  return (
    <div className="card">
      <Link to={`/product/${product.id}`} className="card__link">
        <img className="card__img" src={image} alt={title} />
        <h3 className="card__title">{title}</h3>
      </Link>
      <div className="card__description">
        <p className="card__price">{price}$</p>
        {isLogin && (
          <button
            onClick={likeHandler}
            type="submit"
            className={cardLikeButtonClassName}
          ></button>
        )}
      </div>
    </div>
  )
}
