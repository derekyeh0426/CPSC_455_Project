import React, { useState, useEffect } from 'react';
import {
    Grid
} from '@material-ui/core'
import '../landing/DisplayAllFurniture.css'
import { store } from '../../redux/store';
import { makeStyles } from '@material-ui/core/styles';
import client from "../../API/api";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    cardRoot: {
        width: 400,
        maxHeight: 600
    },
    media: {
        height: 300,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
}));

export default function DisplayCartItems(props) {
    let cart = Array.from(props.allCartItems);
    const classes = useStyles()

    const [cartListings, setCartListings] = useState([]);

    useEffect(() => {
        let buyerId = store.getState().id
        client.user.getUserById(buyerId).then(response => {
            let cart = response.data.cart;
            console.log(cart.listings)
            if (cart !== null) {
                Promise.all(
                    cart.listings.map((listing) =>
                        client.listing.getListingById(listing))).then((listings) =>
                            setCartListings(listings.map(({ data }) => {
                                return data;
                            })))
            }


        })
    }, [store.getState().id])

    return (

        <ul>
            { cartListings.map((listing) => {
                    return (
                        <div>
                            <p> { listing.title } </p>
                            <img src={listing.images[0].imageUrl} width={200} height={200}/>
                            <p> {listing.furniture.price} </p>
                        </div>
                    )
                }) }
        </ul>
    )
}