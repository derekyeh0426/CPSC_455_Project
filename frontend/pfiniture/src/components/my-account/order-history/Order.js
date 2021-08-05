import React from 'react'

const Order = (props) => {
    let order = props.order
    return (
        <tr key={props.index}>
            <td>{"1001"}</td>
            <td><a href={"productUrl"}>{"productName"}</a></td>
            <td>{order.totalAmount}</td>
            <td>{"seller"}</td>
            <td>{order.paymentType}</td>
        </tr>
    )
}

export default Order