import React, { useState, useEffect } from 'react';
import client from '../../../API/api';
import { store } from '../../../redux/store';
import Table from './Table'

export default function Orders(props) {
    const [allOrderHistory, setallOrderHistory] = useState(0);

    // get all orders of users using user id
    // get each order by user id and add to allOrderHistory
    useEffect(() => {
        let userId = store.getState().id
        client.user.getUserById(userId).then(userData => {
            console.log(userData.data)
            // NOTE: 61079e31d1d1014175a5c561 is the order ID, not the user ID
            client.order.getOrderById("6105b75fe155c00015960be7").then(order => {
                setallOrderHistory(order.data)
                console.log(order.data)
                console.log(order.data.furnitures)})
        })
    }, [])

    return (
        <Table />
    )
}