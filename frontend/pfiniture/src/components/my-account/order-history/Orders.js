import React, { useState, useEffect } from 'react';
import client from '../../../API/api';
import { store } from '../../../redux/store';
import Table from './Table'

export default function Orders() {
    const [allOrderHistory, setallOrderHistory] = useState(0);

    useEffect(() => {
        let userId = store.getState().id
        client.user.getUserById(userId).then(() => {
            client.order.getOrderByUserId(userId).then(allOrders => {
                let temp = []
                allOrders.data.forEach(orderId => {
                    client.order.getOrderById(orderId).then(order => {
                        temp.push(order.data)
                    })
                })
                setallOrderHistory(temp)
            })
        })
    }, [])

    return (
        <Table allOrderHistory={allOrderHistory} />
    )
}