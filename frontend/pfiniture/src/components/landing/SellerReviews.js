import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    Paper,
} from '@material-ui/core';
import DisplayRatingsOrComments from './DisplayRatingsOrComments'

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
    const [commentsAndRatings, setCommentsAndRatings] = React.useState(false);
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
            let tempUpdatedComments = JSON.parse(JSON.stringify(comments));
            let tempUpdatedRatings = JSON.parse(JSON.stringify(ratings));
            if (!comments && !ratings) {
                setCommentsAndRatings(false)
            } else {
                setCommentsAndRatings(true)
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
            {commentsAndRatings
                ? "No reviews yet"
                :
                <div>
                    {!reviewArray
                        ? "!reviewArray"
                        : <DisplayRatingsOrComments
                            isRatings={true}
                            isComments={true}
                            ratingsOrComments={reviewArray} />
                    }
                    {!updatedComments
                        ? ""
                        : <DisplayRatingsOrComments
                            isRatings={false}
                            isComments={true}
                            ratingsOrComments={updatedComments} />
                    }
                    {!updatedRatings
                        ? ""
                        : <DisplayRatingsOrComments
                            isRatings={true}
                            isComments={false}
                            ratingsOrComments={updatedRatings} />
                    }
                </div>
            }
        </div>
    )
}