import React from 'react'
import Order from './Order'

const Table = (props) => {
    let orderHistory = props.allOrderHistory
    console.log("hi")
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
                        // "Order!"

                        orderHistory.map((order, index) => {
                            // <Order key={index} order={order} />
                            // console.log(order)

                            <tr>
                                <td>{"1001"}</td>
                                <td><a href={"productUrl"}>{"productName"}</a></td>
                                <td>{order.totalAmount}</td>
                                <td>{"seller"}</td>
                                <td>{order.paymentType}</td>
                            </tr>

                        })
                    }
                </tbody>
                {/* <Order orderId={"1,002"} productUrl={"#"} productName={"Wooden Table"} price={50} seller={"Derek"} payment={"Visa"} ></Order>
                    <Order orderId={"1,003"} productUrl={"#"} productName={"Wooden Desk"} price={88} seller={"Daniel"} payment={"MasterCard"} ></Order> */}

            </table>
        </div>
    )
}

export default Table