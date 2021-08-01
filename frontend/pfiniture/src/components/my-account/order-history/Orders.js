import React, { useState, useEffect } from 'react';
import client from '../../../API/api';
import Table from './Table'

export default function Orders(props) {
    const [allOrderHistory, setallOrderHistory] = useState(0);

    // get all orders of users using user id
    // get each order by order id and add to allOrderHistory
    useEffect(() => {
        console.log(props.id)
        // client.user.getUserById().then(userData => {
        //     console.log(userData)
        //     client.order.getOrderById().then(order => {
        //         setsetallOrderHistory(order.data)})
        // })
    }, [])

    return (
        <Table />
    )
}