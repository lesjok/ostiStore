import { FeatureFlagContext } from '../../contexts/FeatureFlagContext'
import { useAuthentication } from '../../firebase/FirebaseAuth'
import { useLiked } from '../../firebase/FirebaseFavourites'
import React, { useCallback, useContext } from 'react'
import type { IProduct } from '../../types/type'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
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
  const { isTelegramShareEnabled } = useContext(FeatureFlagContext)
  const { isLogin } = useAuthentication()
  const cardLikeButtonClassName = isLiked ? 'card__like-active' : ''

  const likeHandler = () => {
    toggleIsLiked(product)
  }

  const handleShareClick = useCallback(() => {
    const encodedURL = `https://t.me/share/url?url=${encodeURIComponent(
      `${window.location.href}product/${id}`,
    )}&text=${encodeURIComponent(title)}`
    window.open(encodedURL, '_blank')
  }, [title, id])

  return (
    <div className="card">
      <Link to={`/product/${product.id}`} className="card__link" role="link">
        <img className="card__img" src={image} alt={title} />
        <h3 className="card__title">{title}</h3>
      </Link>
      <div className="card__description">
        <p className="card__price">{price}$</p>
        {isLogin && (
          <>
            <button
              onClick={likeHandler}
              type="submit"
              className={`card__like ${cardLikeButtonClassName}`}
            ></button>
            {isTelegramShareEnabled && (
              <button
                onClick={handleShareClick}
                type="submit"
                className="card__share"
              >
                share
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

CardItem.propTypes = {
  id: PropTypes.number,
  price: PropTypes.number,
  title: PropTypes.string,
  image: PropTypes.string,
  product: PropTypes.shape({
    category: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
}
