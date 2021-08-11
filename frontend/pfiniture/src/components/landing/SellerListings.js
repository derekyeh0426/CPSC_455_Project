import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Fade,
    Grid,
    Typography,
    Paper,
    ButtonBase,
} from '@material-ui/core';
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

export default function SellerListings(props) {
    const classes = useStyles();
    const [listings, setListings] = React.useState([]);
    const [user, setUser] = React.useState(props.userInfo);

    useEffect(() => {
        if (user) {
            setUser(props.userInfo)
            client.listing.getListingByUserId(user.id).then(listings => {
                setListings(listings.data);
            })
        } else {
            setUser({})
            setListings([])
        }
    }, [props.userInfo])

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
                                        <Button size="small" color="primary" onClick={() => onAddToCart(listing.id)}>
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

function onAddToCart(listingID) {
    const userID = "6104918f9a92da1084fb7438";
    client.user.getUserById(userID).then((response) => {
        const cart = response.data.cart;
        if (!cart) {
            client.cart.addCartToUser({ user: userID, listing: listingID }).then((response) => console.log(response));
        }
        else {
            console.log("user already has cart");
            client.cart.updateCartById({ user: userID, listing: listingID, id: cart.id }).then((response) => {
                console.log(response)
            });
        }
    })
}