import React from 'react'
import "./Subtotal.scss"
import CurrencyFormat from "react-currency-format"
import { useStateValue } from './StateProvider'
import { getBasketTotal } from './reducer';
import { useHistory } from 'react-router-dom';

function Subtotal() {
    const history = useHistory();
    const [{ user, basket }, dispatch] = useStateValue();

    const handleCheckout = e => {
        e.preventDefault()
        if (!user) {
            history.push('/login');
        } else {
            if (basket.length > 0) {
                history.push('/payment');
            } else {
                console.error('Empty basket')
            }
        }
    }

    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>Subtotal ({basket?.length} items) : <strong>{ value }</strong></p>
                        <small className="subtotal__gift">
                            <input type="checkbox"/> This order contains a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            <button onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal
