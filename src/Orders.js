import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import Order from './Order';
import './Orders.scss'
import { useStateValue } from './StateProvider';

function Orders() {    
    const [orders, setOrders] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (!user) {
            setOrders([]);
            return;
        }

        db
            .collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created', 'desc')
            .onSnapshot(snapshot => {
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
    }, [user]);

    return (
        <div className="orders">
            <h1>Your Orders</h1>
            <div className="orders__order">
                {orders?.map((data, i) => (
                    <Order key={i} order={data} />
                ))}
            </div>
        </div>
    )
}

export default Orders
