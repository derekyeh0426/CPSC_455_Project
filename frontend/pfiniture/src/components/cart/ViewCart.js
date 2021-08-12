import React, { useState, useEffect } from 'react';
import CheckOut from '../payment/CheckOut'
import client from "../../API/api";
import {
    Container, 
    Button
} from '@material-ui/core'
import { store } from '../../redux/store';
import '../landing/DisplayAllFurniture.css'
import DisplayListings from '../landing/DisplayListings';

export default function ViewCart() {
    const [buyer, setBuyer] = useState([]);
    const [cartListings, setCartListings] = useState([]);
    const [cartId, setCardId] = useState("");

    useEffect(() => {
        let buyerId = store.getState().id
        client.user.getUserById(buyerId).then(userInfo => {
            let cart = userInfo.data.cart;
            setBuyer(userInfo)
            if (cart !== null) {
                setCardId(cart.id)
                Promise.all(
                    cart.listings.map((listing) =>
                        client.listing.getListingById(listing))).then((listings) =>
                            setCartListings(listings.map(({ data }) => {
                                return data;
                            })))
            }
        })
    }, [store.getState().id])

    const clearCart = () => {
        client.cart.updateCartById({listing: [], id: cartId}).then((cartInfo) => {
                setCartListings([])
            }
        )
    }

    return (
        <div>
            <div className="about-header">
                <p className="card_header">My Cart</p>
            </div>
            <div className="grid-container">
                <Container>
                    {cartListings.length === 0
                        ? "No furniture in cart"
                        :
                        <div>
                            <CheckOut />
                            <Button onClick={clearCart}>Clear Cart</Button>
                            <DisplayListings page={"cart"} listings={cartListings} userInfo={buyer} cardId={cartId} />
                        </div>
                    }
                </Container>
            </div>
        </div>
    )
}