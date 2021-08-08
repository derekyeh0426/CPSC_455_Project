import React, { useState, useEffect } from 'react';
import client from '../../../API/api';
import { store } from '../../../redux/store';
import Table from './Table'

export default function Orders() {
    const [allOrderHistory, setallOrderHistory] = useState(0);

    useEffect(() => {
        let userId = store.getState().id
        console.log(userId)
        client.order.getOrderByUserId(userId).then(allOrders => {
            let temp = []
            console.log(allOrders.data)
            setallOrderHistory(temp)
        })
    }, [])

    return (
        <Table allOrderHistory={allOrderHistory} />
    )
}