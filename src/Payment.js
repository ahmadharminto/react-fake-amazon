import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react'
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.scss'
import { getBasketTotal } from './reducer';
import { useStateValue } from './StateProvider';
import axios from './axios';
import { db } from "./firebase";

function Payment() {
    const [{ basket, user}, dispatch] = useStateValue();
    
    const history  = useHistory();
    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                url: `/payments/create?total=${Math.round(getBasketTotal(basket) * 100)}`
            })
            setClientSecret(response.data.clientSecret)
        }
        if (Math.round(getBasketTotal(basket) * 100) > 0) {
            getClientSecret()
        }
    }, [basket])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (basket.length == 0) {
            console.error('Empty basket')
            return;
        }

        setProcessing(true);
        
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            setSucceeded(true)
            setError(null)
            setProcessing(false)

            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                })

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders')
        })
    }

    const handleChange = e => {
        setDisabled(e.empty)
        setError(e.error ? e.error.messages : '')
    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>Checkout <Link to="/checkout">{basket?.length} item(s)</Link></h1>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{user?.email}</p>
                        <p>Bantul</p>
                        <p>Yogyakarta</p>
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket?.map((item, i) => (
                            <CheckoutProduct
                                key={i}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment__priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total : {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                        </form>
                        {error && <div>{error}</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
