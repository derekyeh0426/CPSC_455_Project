import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Button,
    Modal,
    Backdrop,
    Fade,
    Radio,
    TextField,
    Tabs,
    Tab,
    Typography
} from '@material-ui/core';
import client from "../../API/api";
import { RATINGS } from "../../constants"
import SellerListings from './SellerListings';
import SellerReviews from './SellerReviews';

const StyledTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        '& > span': {
            maxWidth: 40,
            width: '100%',
            backgroundColor: '#405dc5',
        },
    },
})((props) => <Tabs centered {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        color: '#405dc5',
        fontWeight: theme.typography.fontWeightRegular,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
        '&:focus': {
            opacity: 1,
        },
    },
}))((props) => <Tab disableRipple {...props} />);

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
    demo2: {
        backgroundColor: 'transparent',
    },
    padding: {
        padding: theme.spacing(3),
    },
    tabPadding: {
        padding: theme.spacing(1),
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
    let page = props.page
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = React.useState(props.userInfo);
    const [ratings, setRatings] = React.useState([]);
    const [sellerRating, setSellerRating] = React.useState(0);
    const [comments, setComments] = React.useState([]);
    const [ratingValue, setRatingValue] = React.useState(0);
    const [comment, setComment] = React.useState('');
    const [listings, setListings] = React.useState([]);

    const handleOpen = () => {
        setOpen(true);
        console.log(props.userInfo)
        client.listing.getListingByUserId(user.id).then(listings => {
            setListings(listings.data);
            client.user.getUserById(user.id).then(userInfo => {
                setRatings(userInfo.data.ratings)
                setComments(userInfo.data.comments)
                client.user.getAllRatingsByUserId(user.id).then(ratings => {
                    setSellerRating(ratings.data.overall)
                })
            })
        })
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

    const [tab, setTab] = React.useState(0);

    const handleTabChange = (event, newTab) => {
        setTab(newTab);
        console.log(newTab)
    };

    const getTabs = (tab) => {
        switch (tab) {
            case 0:
                return <SellerListings listings={listings} userInfo={user} />
            case 1:
                return <SellerReviews ratings={ratings} comments={comments} userInfo={user} />
            default:
                return <SellerListings userInfo={user} />
        }
    }

    useEffect(() => {
        if (user) {
            setUser(props.userInfo)
        } else {
            setUser({})
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
                                <h2 id="view-seller-profile">{user.name}'s Profile ({sellerRating})</h2>
                                <p id="location-description">Based in {user.location}</p>
                            </div>
                        }
                        {page === "order-history"
                            ?
                            <div>
                                <p className={classes.alignCenter}>Since you bought furniture from {!user ? "this seller" : user.name}...</p>
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
                        <div className={classes.demo2}>
                            <StyledTabs value={tab} onChange={handleTabChange} aria-label="styled-tabs">
                                <StyledTab label="Listings" />
                                <StyledTab label="Reviews" />
                            </StyledTabs>
                            <Typography className={classes.tabPadding} />
                            {getTabs(tab)}
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

