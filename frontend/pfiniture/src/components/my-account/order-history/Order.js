import React from 'react'

const Order = (props) => {
    console.log("")
    console.log(props.order)
    return (
        <tr>
            <td>{props.orderId}</td>
            <td><a href={props.productUrl}>{props.productName}</a></td>
            <td>{props.price}</td>
            <td>{props.seller}</td>
            <td>{props.payment}</td>
        </tr>
    )
}

export default Order