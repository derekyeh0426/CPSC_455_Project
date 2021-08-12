import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {Button,Modal,Backdrop,Fade,Typography,Tabs,Tab,} from '@material-ui/core';
import client from "../../API/api";
import SellerListings from './SellerListings';
import SellerReviews from './SellerReviews';
import ReviewSeller from "../my-account/order-history/ReviewSeller"

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
    listingsTitle: {
        marginTop: 10
    }
}));

export default function ViewSellerProfile(props) {
    let page = props.page
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(props.userInfo);
    const [ratings, setRatings] = useState([]);
    const [sellerRating, setSellerRating] = useState(0);
    const [comments, setComments] = useState([]);
    const [listings, setListings] = useState([]);
    const [tab, setTab] = useState(0);

    const handleOpen = () => {
        setOpen(true);
        client.listing.getListingByUserId(user.id).then(listings => {
            setListings(listings.data);
            client.user.getUserById(user.id).then(userInfo => {
                setRatings(userInfo.data.ratings);
                setComments(userInfo.data.comments);
                client.user.getAllRatingsByUserId(user.id).then(ratings => {
                    setSellerRating(ratings.data.overall);
                });
            });
        });
    };

    const handleClose = () => {
        setOpen(false);
        setTab(0);
    };

    const handleTabChange = (event, newTab) => {
        setTab(newTab);
    };

    const getTabs = (tab) => {
        switch (tab) {
            case 0:
                return <SellerListings listings={listings} userInfo={user} />
            case 1:
                return <SellerReviews isOpen={open} ratings={ratings} comments={comments} userInfo={user} />
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
                            ? <ReviewSeller userInfo={user}/>
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

