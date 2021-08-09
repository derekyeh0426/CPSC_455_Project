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
    Radio,
    TextField,
} from '@material-ui/core';
import client from "../../API/api";
import { RATINGS } from "../../constants"

const useStyles = makeStyles((theme) => ({
    alignCenter: {
        
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
    alignCenter: {
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
    review: {
        display: 'flex',
    },
    rating: {
        float: "left",
        marginRight: 5,
        border: "1px solid #bdbdbd",
        borderRadius: 5,
        padding: 10,
        '&:hover': {
            borderColor: "black"
        },
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    comment: {
        float: "right",
        marginLeft: 5,
        border: "1px solid #bdbdbd",
        borderRadius: 5,
        padding: 8,
        '&:hover': {
            borderColor: "black"
        },
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    }
}));

export default function ViewSellerProfile(props) {
    let page = props.page;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [listings, setListings] = React.useState([]);
    const [user, setUser] = React.useState(props.userInfo);
    const [userId, setUserId] = React.useState(props.userId);
    const [ratingValue, setRatingValue] = React.useState(0);
    const [comment, setComment] = React.useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setRatingValue(0);
        setComment('');
    };

    const handleRatingChange = (event) => {
        setRatingValue(event.target.value);
    };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };


    useEffect(() => {
        if (user || userId) {
            if (page === "landing") {
                setUser(props.userInfo)
                client.listing.getListingByUserId(user.id).then(listings => {
                    setListings(listings.data);
                })
            } else if (page === "order-history") {
                setUserId(props.userId)
                console.log(props.userId)
                client.user.getUserById(userId).then(info => {
                    setUser(info.data)
                    client.listing.getListingByUserId(info.data.id).then(listings => {
                        setListings(listings.data);
                    })
                })
            } else {
                setUser({})
                setListings([])
            }
        }
    }, [props.userInfo, props.userId])

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
                        {props.page === "order-history"
                            ?
                            <div>
                                <p className={classes.alignCenter}>Since you bought furniture from {!user.name ? "this seller" : user.name}...</p>
                            <div className={classes.alignCenter}>
                                <div className={classes.rating}>
                                    <p id="rate-seller-p">Leave a rating!</p>
                                    <div className={classes.alignCenter}>
                                    {RATINGS.map((rating, index) => {
                                        return (
                                            <Radio
                                                key={index}
                                                checked={ratingValue === rating}
                                                onChange={handleRatingChange}
                                                value={rating}
                                                name={rating}
                                                inputProps={{ 'aria-label': 'A' }}
                                            />
                                        )
                                    })
                                    }
                                    </div>
                                    <Button className={classes.alignCenter}>Submit Rating</Button>
                                </div>
                                <div className={classes.comment}>
                                {/* <p id="rate-seller-p">Leave a comment!</p> */}
                                    <TextField
                                        id="comment-seller-textfield"
                                        label="Leave a comment!"
                                        multiline
                                        rows={3}
                                        value={comment}
                                        onChange={handleCommentChange}
                                    />
                                    <Button>Submit Comment</Button>
                                </div>
                            </div>
                            </div>
                            : ""
                        }
                        <h6 id="profile-modal-description">All listings </h6>
                        {!listings
                            ? "No Matched Results"
                            :
                            <div>
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