import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button,Grid,Typography,Paper,ButtonBase,} from '@material-ui/core';
import { onAddToCart } from '../../helpers'
import client from "../../API/api";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
        flexGrow: 1,
    },
    gridPaper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    alignCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    padding: {
        padding: theme.spacing(3),
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '50%',
        height: '80%',
        overflowY: 'auto'
    },
    image: {
        width: 200,
        height: 200,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    }
}));

export default function DisplayListings(props) {
    const classes = useStyles();
    const [listings, setListings] = useState(props.listings);
    const [buyer, setBuyer] = useState(props.userInfo);

    useEffect(() => {
        if (buyer) {
            setBuyer(props.userInfo)
            setListings(props.listings)
        } else {
            setBuyer({})
            setListings([])
        }
    }, [props.userInfo, props.listings])

    return (
        <div>
        {!listings
            ? "No Matched Results"
            :
            listings.map((listing, index) => (
                <div key={index} className={classes.root}>
                    <Paper className={classes.gridPaper}>
                        <Grid
                            container
                            spacing={2}
                            direction="row"
                            justifyContent="center"
                            alignItems="center">
                            <Grid item>
                                <ButtonBase className={classes.image}>
                                    <img
                                        className={classes.img}
                                        alt={listing.furniture.name}
                                        src={listing.images[0] ? listing.images[0].imageUrl : ""} />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="h6" component="h2">
                                            {listing.furniture.name}
                                        </Typography>
                                        <Typography variant="body2" gutterBottom>
                                            {listing.description}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Type: {listing.type}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Button size="small" color="primary" onClick={() => onAddToCart(listing.id, buyer.id)}>
                                            Add to Cart
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">${listing.furniture.price}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            ))
        }
        </div>
    )
}