import React, { useState, useEffect } from 'react'
import client from '../../../API/api';
import { store } from '../../../redux/store';
import Order from './Order'

const Table = () => {
    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        let userId = store.getState().id
        client.order.getOrderByUserId(userId).then(allOrders => {
            setOrderHistory(allOrders.data)
        })
    }, [])

    console.log(orderHistory)

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
                {!orderHistory
                        ? "No Orders Have Been Made"
                        : ""
                        // error orderhistory.map is not a function
                        // orderHistory.map((order, index) => {
                        //     console.log(index)
                        //     return (
                        //         <Order key={index} index={index} order={order} />
                        //     )
                        // })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table