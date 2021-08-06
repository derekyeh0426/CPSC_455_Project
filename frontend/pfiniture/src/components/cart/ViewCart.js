import React, { useState, useEffect }  from 'react';
import CheckOut from '../payment/CheckOut'
import DisplayCartItems from './DisplayCartItems'
import client from "../../API/api";
import {
    Container
} from '@material-ui/core'
import '../landing/DisplayAllFurniture.css'



export default function ViewCart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const userID = "6104918f9a92da1084fb7438";
        client.user.getUserById(userID).then(response => {
            if (response.status === 200) {
                const cart = response.data.cart;
                if (cart != null) {
                    setCart(cart.listings.map((listing) => listing));
                }
            }
        })
    }, [])
    return (
        <div>
            <h1>My Cart</h1>
            <div className="grid-container">
            <Container>
                <DisplayCartItems allCartItems={cart}/>
            </Container>
        </div>
            <CheckOut />
        </div>
    )
}