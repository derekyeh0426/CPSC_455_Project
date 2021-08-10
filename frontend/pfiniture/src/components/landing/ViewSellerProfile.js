import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Modal,
    Backdrop,
    Fade,
    Grid,
    Typography,
    Paper,
    ButtonBase,
} from '@material-ui/core';
import client from "../../API/api";
import ReviewSeller from "../my-account/order-history/ReviewSeller"

const useStyles = makeStyles((theme) => ({
    alignCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    root: {
        padding: theme.spacing(1),
        flexGrow: 1,
    },
    gridPaper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '50%',
        maxHeight: '80%',
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
    },
    listingsTitle: {
        marginTop: 10
    }
}));

export default function ViewSellerProfile(props) {
    let page = props.page
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [listings, setListings] = React.useState([]);
    const [user, setUser] = React.useState(props.userInfo);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
            <Button color="primary" onClick={handleOpen}>
                View Seller's Profile
            </Button>
            <Modal
                aria-labelledby="view-seller-profile"
                aria-describedby="profile-modal-description"
                className={classes.alignCenter}
                open={open}
                onClose={handleClose}
                scrollable
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        {!user
                            ? "No seller found"
                            :
                            <div>
                                <h2 id="view-seller-profile">{user.name}'s Profile ({user.rating})</h2>
                                <p id="location-description">Based in {user.location}</p>
                            </div>
                        }
                        {page === "order-history"
                            ? <ReviewSeller userInfo={user}/>
                            : ""
                        }
                        {!listings
                            ? "No listings posted."
                            :
                            <div>
                                <h5 className={classes.listingsTitle} id="profile-modal-description">All listings </h5>
                                {listings.map((listing, index) => (
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
                                ))}
                            </div>
                        }
                    </div>
                </Fade>
            </Modal>
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