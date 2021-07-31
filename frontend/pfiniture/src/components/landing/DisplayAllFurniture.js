import React, { useState, useEffect } from 'react';
import './DisplayAllFurniture.css';
import {
    Container,
    Button,
    IconButton
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DisplayIndividualFurniture from "./DisplayIndividualFurniture"
import client from "../../API/api";

const useStyles = makeStyles(() => ({
    addListing: {
        bottom: '5%',
        right: '1.25%',
        position: 'fixed',
        '&:hover': {
            background: 'none',
            transform: "scale3d(1.20, 1.20, 1)"
        }
    }
}));

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
    const classes = useStyles()

    const handleAddListing = () => {
        console.log("open listing modal")
    }

    useEffect(() => {
        client.listing.getAllListings().then(listings => {
            setListings(listings.data);
        })
    }, [])

    return (
        <div>
            <Button onClick={getUsers}>Get Users</Button>
            <Button onClick={getListings}>Get Listings</Button>
            <IconButton className={classes.addListing} onClick={handleAddListing}>
                <AddCircleOutlineIcon color="primary" style={{ fontSize: 50 }} />
            </IconButton>
            <div className="grid-container">
            <Container>
                    <DisplayIndividualFurniture allListings={listings} />
            </Container>
        </div>
        </div>
    )
}