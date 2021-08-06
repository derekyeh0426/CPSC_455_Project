import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal, Backdrop, Fade,
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    IconButton,
    Collapse,
    Slider,
    Input } from '@material-ui/core';
import client from "../../API/api";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '50%',
        maxHeight: '80%',
        overflowY: 'auto'
    },
}));

export default function ViewSellerProfile(props) {
    let user = props.userInfo;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [expandedId, setExpandedId] = React.useState(-1);
    const [listings, setListings] = React.useState([]);

    const handleExpandClick = (index) => {
        setExpandedId(expandedId === index ? -1 : index);
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        console.log("hello")
        client.listing.getListingByUserId(user.id).then(listings => {
            setListings(listings.data);
            console.log(listings.data);
        })
    }, [])

    return (
        <div>
            <Button color="primary" onClick={handleOpen}>
                View Seller's Profile
            </Button>
            <Modal
                aria-labelledby="view-seller-profile"
                aria-describedby="profile-modal-description"
                className={classes.modal}
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
                        <h2 id="view-seller-profile">{user.name}'s Profile ({user.rating})</h2>
                        <p id="profile-modal-description">Location: {user.location}</p>
                        <p id="profile-modal-description">All listings: </p>
                        {listings.length === 0
                ? "No Matched Results"
                :
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                    {
                    listings.map((listing, index) => (
                        <div key={index} className="furniture-spacing">
                            <Card key={index} className={classes.cardRoot}>
                                {/* <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        // image={listing.images[0].imageUrl}
                                        title={listing.furniture.name}
                                    />
                                </CardActionArea> */}
                                <Typography gutterBottom variant="h6" component="h2">
                                    ${listing.furniture.price} • {listing.furniture.name}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="h2">
                                </Typography>
                                <Collapse in={expandedId === index} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Seller: {listing.user.name} ({listing.user.rating})
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Type: {listing.type}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Description: {listing.description}
                                        </Typography>
                                    </CardContent>
                                </Collapse>
                                <IconButton
                                    onClick={() => { handleExpandClick(index) }}
                                    aria-expanded={expandedId === index}
                                    aria-label="show more">
                                    <ExpandMoreIcon />
                                </IconButton>
                                <CardActions>
                                    <ViewSellerProfile userInfo={listing.user} />
                                    <Button size="small" color="primary" onClick={() => onAddToCart(listing.id)}>
                                        Add to Cart
                                    </Button>
                                </CardActions>
                            </Card>
                        </div>
                    ))}
                </Grid>
            }
                        <p id="profile-modal-description">LoremLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
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
            client.cart.addCartToUser({user: userID, listing: listingID}).then((response) => console.log(response));
        }
        else {
            console.log("user already has cart");
            client.cart.updateCartById({user: userID, listing: listingID, id: cart.id}).then((response) => {
                console.log(response)
            });
        }
    })
}