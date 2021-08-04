import React from 'react'
import Order from './Order'

const Table = (props) => {
    return (
        <>
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
                    <Order orderId={"1,001"} productUrl={"#"} productName={"Wooden Chair"} price={78} seller={"Peter"} payment={"Paypal"} ></Order>
                    <Order orderId={"1,002"} productUrl={"#"} productName={"Wooden Table"} price={50} seller={"Derek"} payment={"Visa"} ></Order>
                    <Order orderId={"1,003"} productUrl={"#"} productName={"Wooden Desk"} price={88} seller={"Daniel"} payment={"MasterCard"} ></Order>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table