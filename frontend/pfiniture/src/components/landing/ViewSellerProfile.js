import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Button,
    Modal,
    Backdrop,
    Fade,
    Grid,
    Typography,
    Paper,
    Radio,
    TextField,
    Tabs,
    Tab
} from '@material-ui/core';
import client from "../../API/api";
import { RATINGS } from "../../constants"
import SellerListings from './SellerListings';

const StyledTabs = withStyles({
    indicator: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      '& > span': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: '#000000',
      },
    },
  })((props) => <Tabs centered {...props} TabIndicatorProps={{ children: <span /> }} />);

  const StyledTab = withStyles((theme) => ({
    root: {
      textTransform: 'none',
      color: '#000000',
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
        backgroundColor: '#c7e7e8',
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

    const [tab, setTab] = React.useState(0);

    const handleTabChange = (event, newTab) => {
        setTab(newTab);
        console.log(newTab)
    };

    // const getTabs = () => {
    //     switch(tab) {
    //         case 0:
    //             return (
                
    //             )
    //     }
    // }

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
                                <h2 id="view-seller-profile">{user.name}'s Profile ({user.rating})</h2>
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
                                <SellerListings userInfo={user}/>
                                {/* {getTabs} */}
                                {
                                <div className={classes.root}>
                                    <Paper className={classes.gridPaper}>
                                            <Grid
                                                container
                                                spacing={2}
                                                direction="row"
                                                justifyContent="center"
                                                alignItems="center">
                                                    <Grid item xs={12} sm container>
                                                    <Grid item xs container direction="column" spacing={2}>
                                                        <Grid item xs>
                                                            <Typography gutterBottom variant="h6" component="h2">
                                                                Buyer's name
                                                            </Typography>
                                                            <Typography variant="body2" gutterBottom>
                                                                Buyer's rating
                                                            </Typography>
                                                            <Typography variant="body2" color="textSecondary">
                                                                None
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                </Grid>
                                    </Paper>
                                </div>
                            }
                            </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

