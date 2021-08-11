import React, { useState, useEffect } from 'react'
import client from '../../../API/api';
import { store } from '../../../redux/store';
import { isEmpty } from '../../../helpers';
import Order from './Order'

const Table = () => {
    const [orderHistory, setOrderHistory] = useState({});

    useEffect(() => { 
        let userID = store.getState().id
        client.order.getOrderByUserId(userID).then(allOrders => {
            setOrderHistory(allOrders.data)
        })
        
    }, [])

    return (
        <div className="table-responsive">
            <table className="table table-striped table-sm">
                <thead>
                    <tr>
                        <th>Order #</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Seller</th>
                        <th>Payment Type</th>
                    </tr>
                </thead>
                <tbody>
                {isEmpty(orderHistory)
                        ? "No Orders Have Been Made"
                        :
                        orderHistory.map((order, index) => {
                            console.log(index)
                            return (
                                <Order key={index} index={index} order={order} />
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table