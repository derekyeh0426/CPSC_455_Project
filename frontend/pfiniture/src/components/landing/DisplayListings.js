import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { Button, Grid, Typography, Paper, ButtonBase, } from '@material-ui/core';
import { onAddToCart, updateToCart } from '../../helpers';
import ViewSellerProfile from '../landing/ViewSellerProfile';
import client from '../../API/api'
import UserAddCartItem from '../../redux/users/UserAddCartItem'
import UserRemoveCartItem from '../../redux/users/UserRemoveCartItem'

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

function DisplayListings(props) {
    const classes = useStyles();
    const [page, setPage] = useState(props.page)
    const [listings, setListings] = useState(props.listings);
    const [buyer, setBuyer] = useState(props.userInfo);
    const [viewFromCart, setViewFromCart] = useState(false);
    const [cartId, setCardId] = useState(props.cardId);
    const [render, setRender] = useState(false)

    useEffect(() => {
        if (buyer) {
            setBuyer(props.userInfo)
            setListings(props.listings)
            setPage(props.page)
            setViewFromCart(props.viewFromCart)
            setCardId(props.cardId)
            setRender(false)
        } else {
            setBuyer({})
            setListings([])
        }
    }, [props.userInfo, props.listings, props.page, props.viewFromCart, props.cardId])

    const removeFromCart = (listingIdToDelete) => {
        // updateToCart(listingIdToDelete, listings, cartId, "cart");
        let listing = [];
        listings.forEach(listingId => {
            if (listingId.id !== listingIdToDelete) {
                listing.push(listingId.id);
            }
        })
        console.log(listing)
        client.cart.updateCartById({listing: listing, id: cartId}).then(() => {
            props.UserRemoveCartItem();
            let tempListing = [];
            setRender(true);
            listing.forEach(listingId => {
                client.listing.getListingById(listingId).then((info) =>
                console.log(info.data))
            })
        })
    }

    const getButtons = (page, listing) => {
        switch (page) {
            case "seller":
                    if (viewFromCart) {
                        return ( 
                            <div></div>
                        )
                    } else {
                        return (
                            <Button size="small" color="primary" onClick={() => onAddToCart(listing.id, buyer.id)}>
                                Add to Cart
                            </Button>
                        )
                    }
                
            case "cart":
                return (
                    <div>
                        <ViewSellerProfile userInfo={listing.user} viewFromCart={true}/>
                    </div>
                )
            default:
                return <div></div>
        }
    }


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
                                            {getButtons(page, listing)}
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

function mapStateToProps(state) {
    return {
        isLogIn: state.isLogIn, name: state.name, email: state.email, id: state.id, cartQuantity: state.cartQuantity
    }
}

const mapDispatchToProps = {
    UserAddCartItem,
    UserRemoveCartItem
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DisplayListings)