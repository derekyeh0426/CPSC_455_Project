import React, { useState, useEffect } from 'react';
import client from '../../../API/api';
import { store } from '../../../redux/store';
import Table from './Table'

export default function Orders() {
    const [allOrderHistory, setallOrderHistory] = useState(0);

    useEffect(() => {
        let userId = store.getState().id
        client.user.getUserById(userId).then(userData => {
            console.log(userData.data)
            client.order.getOrderByUserId(userId).then(order => {
                setallOrderHistory(order.data)
                console.log(order.data)})
        })
    }, [])

    return (
        <Table allOrderHistory={allOrderHistory} />
    )
}