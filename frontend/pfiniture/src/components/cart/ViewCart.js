import React, { useState, useEffect }  from 'react';
import CheckOut from '../payment/CheckOut'
import DisplayCartItems from './DisplayCartItems'
import client from "../../API/api";
import {
    Container
} from '@material-ui/core'
import '../landing/DisplayAllFurniture.css'



export default function ViewCart() {
    const [cart, setCart] = useState(0);

    useEffect(() => {
        client.cart.getAllCarts().then(carts => {
            setCart(carts.data);
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