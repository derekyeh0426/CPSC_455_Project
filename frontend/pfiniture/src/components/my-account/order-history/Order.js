import React from 'react'
import ViewSellerProfile from '../../landing/ViewSellerProfile'

const Order = (props) => {
    let order = props.order
    console.log(order.user)
    console.log(order.furnitures)
    let furnitures = order.furnitures
    return (
        <tr key={props.index}>
            {/* {!order.furnitures
            ? ""
        :order.funitures.map((furniture, index) => {
            console.log(furniture)
        })} */}
            <td>{order.id}</td>
            <td><a href={"productUrl"}>{"productName"}</a></td>
            <td>{order.totalAmount}</td>
            <td><ViewSellerProfile userId={order.user} page="order-history" /></td>
            <td>{order.paymentType}</td>
        </tr>
    )
}

export default Order