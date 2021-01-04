import React from 'react'
import LazyLoad from 'react-lazyload';
import './Product.scss'
import { useStateValue } from './StateProvider'

function Product({ id, title, image, price, rating}) {
    const [state, dispatch] = useStateValue();
    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating
            }
        })
    }

    return (
        <div className="product">
            <div className="product__info">
                <p className="product__title">{title}</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {
                        Array(rating)
                            .fill()
                            .map((_, i) => (
                                <p key={i}>🏅</p>
                            ))
                    }
                </div>
                <LazyLoad height={200}>
                    <img src={image} alt="{title}"/>
                </LazyLoad>
                <button onClick={addToBasket}>Add to Basket</button>
            </div>
        </div>
    )
}

export default Product
