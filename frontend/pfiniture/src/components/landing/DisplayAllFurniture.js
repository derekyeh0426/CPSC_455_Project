import React, { useState, useEffect } from 'react';
import './DisplayAllFurniture.css';
import {
    Container,
    Button
} from '@material-ui/core'
import DisplayIndividualFurniture from "./DisplayIndividualFurniture"
import client from "../../API/api";

function getUsers() {
    client.user.getAllUsers().then(res => {
        console.log(res.data)
    })
}

function getListings() {
    client.listing.getAllListings().then(res => {
        console.log(res.data)})
}

export default function DisplayAllFurniture() {
    const [listings, setListings] = useState(0);

    useEffect(() => {
        client.listing.getAllListings().then(listings => {
            setListings(listings.data);
        })
    }, [])

    return (
        <div>
            <Button onClick={getUsers}>Get Users</Button>
            <Button onClick={getListings}>Get Listings</Button>
            <div className="grid-container">
            <Container>
                    <DisplayIndividualFurniture allListings={listings} />
            </Container>
        </div>
        </div>
    )
}