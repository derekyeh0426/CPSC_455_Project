import React from 'react'
import ViewSellerProfile from '../../landing/ViewSellerProfile'
import client from '../../../API/api';

const Order = (props) => {
    let order = props.order
    console.log(order)
    console.log(order.seller)
    return (
        <tr key={props.index}>
            <td>{order.id}</td>
            <td>
                {/* {!order.furnitures
                    ? ""
                    : order.furnitures.map((furnitureId, index) => {
                        let furnitureName = "hi"
                        client.furniture.getFurnitureById(furnitureId).then(furniture => {
                            console.log(furniture.data.name)
                            furnitureName = furniture.data.name
                        })
                        return (
                            <p href={"productUrl"}>{furnitureName}</p>
                        )
                    })} */}
            </td>
            <td>{order.totalAmount}</td>
            <td><ViewSellerProfile userId={order.seller} page="order-history" /></td>
            <td>{order.paymentType}</td>
        </tr>
    )
}

export default Order