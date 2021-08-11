import React, { useState, useEffect } from 'react';
import {
    Grid
} from '@material-ui/core'
import '../landing/DisplayAllFurniture.css'
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

    const [listings, setListings] = useState([]);

    useEffect(() => {
        const userID = "6104918f9a92da1084fb7438";
        client.user.getUserById(userID).then(response => {
            if (response.status === 200) {
                const cart = response.data.cart;
                if (cart != null) {
                    Promise.all(
                            cart.listings.map((listing) => 
                            client.listing.getListingById(listing))
                            ).then((listings) => setListings(listings.map(({data}) => {
                                return data;
                            })))
                }
            }
        })
    }, [])

    return (

            <ul>
                { listings.map((listing) => {
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