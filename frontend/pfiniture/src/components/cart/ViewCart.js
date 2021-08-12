import React, { useState, useEffect } from 'react';
import CheckOut from '../payment/CheckOut'
import DisplayCartItems from './DisplayCartItems'
import client from "../../API/api";
import {
    Container
} from '@material-ui/core'
import { store } from '../../redux/store';
import '../landing/DisplayAllFurniture.css'

export default function ViewCart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        let buyerId = store.getState().id
        client.user.getUserById(buyerId).then(userInfo => {
            console.log(userInfo.data)
            let cart = userInfo.data.cart
            if (cart !== null) {
                setCart(cart);
            }
        })
    }, [store.getState().id])
    return (
        <div>
            <h1>My Cart</h1>
            <div className="grid-container">
                <Container>
                    {cart.length === 0
                        ? "No furniture in cart"
                        : 
                        <div>
                            <DisplayCartItems allCartItems={cart.listings} />
                            <CheckOut allCartItems={cart}/>
                        </div>
                    }
                </Container>
            </div>
        </div>
    )
}