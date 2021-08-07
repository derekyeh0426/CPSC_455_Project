import React, { useState, useEffect } from 'react'
import client from '../../../API/api';
import { store } from '../../../redux/store';
import ViewSellerProfile from '../../landing/ViewSellerProfile'
import Order from './Order'

const Table = () => {
    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        let userId = store.getState().id
        client.user.getUserById(userId).then(() => {
            client.order.getOrderByUserId(userId).then(allOrders => {
                let temp = []
                allOrders.data.forEach(orderId => {
                    client.order.getOrderById(orderId).then(order => {
                        temp.push(order.data)
                        setOrderHistory(temp)
                    })
                })
            })
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
                        :
                        orderHistory.map((order, index) => {
                            console.log(index)
                            let tempSeller = "6104918f9a92da1084fb7438"
                            return (
                                // <Order key={index} index={index} order={order} />
                                <tr key={index}>
                                    <td>{"1001"}</td>
                                    <td><a href={"productUrl"}>{"productName"}</a></td>
                                    <td>{order.totalAmount}</td>
                                    <td><ViewSellerProfile userId={tempSeller} page="order-history" /></td>
                                    <td>{order.paymentType}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table