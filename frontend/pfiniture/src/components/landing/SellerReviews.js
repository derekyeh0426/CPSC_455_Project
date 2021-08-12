import React, { useState, useEffect } from 'react';
import DisplayRatingsOrComments from './DisplayRatingsOrComments'

export default function SellerReviews(props) {
    const [commentsAndRatings, setCommentsAndRatings] = useState(false);
    const [isOpen, setIsOpen] = useState(props.isOpen);
    const [ratings, setRatings] = useState(props.ratings);
    const [comments, setComments] = useState(props.comments);
    const [user, setUser] = useState(props.userInfo);
    const [reviewArray, setReviewArray] = useState([]);
    const [updatedComments, setUpdatedComments] = useState([]);
    const [updatedRatings, setUpdatedRatings] = useState([]);

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
            if (comments.length === 0 && ratings.length === 0) {
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
            {!commentsAndRatings
                ? "No reviews yet!"
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
                        ?
                        <div>
                            {!comments
                                ? ""
                                : <DisplayRatingsOrComments
                                    isRatings={false}
                                    isComments={true}
                                    ratingsOrComments={comments} />
                            }
                        </div>
                        : <DisplayRatingsOrComments
                            isRatings={false}
                            isComments={true}
                            ratingsOrComments={updatedComments} />
                    }
                    {!updatedRatings
                        ?
                        <div>
                            {!ratings
                                ? ""
                                : <DisplayRatingsOrComments
                                    isRatings={true}
                                    isComments={false}
                                    ratingsOrComments={ratings} />}
                        </div>
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