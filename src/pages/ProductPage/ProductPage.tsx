import { useAuthentication, useLiked } from '../../firebase/Firebase'
import { useGetDetailProductQuery } from '../../redux/api'
import { useParams } from 'react-router-dom'
import './ProductPage.css'
import React from 'react'

const ProductPage = () => {
  const { id } = useParams()
  const { data: product } = useGetDetailProductQuery(Number(id))
  const { isLogin } = useAuthentication()
  const { isLiked, toggleIsLiked } = useLiked(Number(id))
  const cardLikeButtonClassName = isLiked
    ? 'card__like card__like-active'
    : 'card__like'

  if (!product) {
    return null
  }
  const likeHandler = () => {
    toggleIsLiked(product)
  }

  return (
    <section className="product">
      <img src={product.image} alt={product.title} className="product__img" />
      <div className="product__details">
        <h1 className="product__title">{product.title}</h1>
        <h3 className="product__price">{product.price}$</h3>
        <div className="product__description">{product.description}</div>
        {isLogin && (
          <button
            type="submit"
            onClick={likeHandler}
            className={cardLikeButtonClassName}
          ></button>
        )}
      </div>
    </section>
  )
}

export default ProductPage
