import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    Paper,
    Button
} from '@material-ui/core';
import client from "../../API/api";
import { RATINGS } from '../../constants';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
        flexGrow: 1,
    },
    gridPaper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    }
}));

export default function SellerReviews(props) {
    const classes = useStyles();
    const [isOpen, setIsOpen] = React.useState(props.isOpen);
    const [ratings, setRatings] = React.useState(props.ratings);
    const [comments, setComments] = React.useState(props.comments);
    const [user, setUser] = React.useState(props.userInfo);
    const [reviewArray, setReviewArray] = React.useState([]);
    const [updatedComments, setUpdatedComments] = React.useState([]);
    const [updatedRatings, setUpdatedRatings] = React.useState([]);

    useEffect(() => {
        if (user) {
            setUser(props.userInfo);
            setRatings(props.ratings)
            setComments(props.comments);
            setIsOpen(props.isOpen)
            getReviews();
        }
        else {
            setUser({});
            setRatings([]);
            setComments([]);
            setIsOpen(false);
        }
    }, [props.userInfo, props.ratings, props.comments, props.isOpen])

    function getReviews() {
    if (isOpen) {
        let tempReviewArray = [];
        let tempUpdatedComments =  JSON.parse(JSON.stringify(comments));
        let tempUpdatedRatings = JSON.parse(JSON.stringify(ratings));
        if (!comments && !ratings) {
            console.log("comments and ratings are empty")
        } else {
            console.log("comments and ratings are here")
            comments.forEach(comment => {
                ratings.forEach(rating => {
                    if (comment.user.id === rating.user.id) {
                        tempReviewArray.push({
                            "id": comment.user.id,
                            "name": comment.user.name,
                            "comment": comment.comment,
                            "rating": rating.rating
                        });
                    }
                });
                setReviewArray(tempReviewArray);
                console.log(comments)
                console.log("----")
                console.log(tempReviewArray);
            });

            comments.forEach((comment, index) => {
                tempReviewArray.forEach(review => {
                    if (review.id === comment.user.id) {
                        tempUpdatedComments.splice(index, 1);
                    }
                });
                setUpdatedComments(tempUpdatedComments);
            });

            ratings.forEach((rating, index) => {
                tempReviewArray.forEach(review => {
                    if (review.id === rating.user.id) {
                        tempUpdatedRatings.splice(index, 1);
                    }
                });
                setUpdatedRatings(tempUpdatedRatings);
            });
        }
    }
}

    return (
        <div>
            {!reviewArray
                ? "!reviewArray"
                : reviewArray.map((review, index) => {
                    return (
                        <div key={index} className={classes.root}>
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
                                                    {review.name}
                                                </Typography>
                                                <Typography variant="body2" gutterBottom>
                                                    {review.comment}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    Rating: {review.rating}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </div>
                    )
                })
            }
            {!updatedComments
                ? ""
                :
                updatedComments.map((comment, index) => {
                    return (
                        <div key={index} className={classes.root}>
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
                                                    {comment.user.name}
                                                </Typography>
                                                <Typography variant="body2" gutterBottom>
                                                    {comment.comment}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </div>
                    )
                })
            }
            {!updatedRatings
                ? ""
                : updatedRatings.map((rating, index) => {
                    return (
                        <div key={index} className={classes.root}>
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
                                                    {rating.user.name}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    Rating: {rating.rating}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </div>
                    )
                })
            }
        </div>
    )
}