import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RATINGS } from "../../../constants"
import {
    Button,
    Radio,
    TextField,
} from '@material-ui/core';
import client from "../../../API/api";

const useStyles = makeStyles((theme) => ({
    alignCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
    },
}))

export default function ReviewSeller(props) {
    const classes = useStyles();
    const [user, setUser] = React.useState(props.user);
    const [ratingValue, setRatingValue] = React.useState(0);
    const [comment, setComment] = React.useState('');

    useEffect(() => {
        if (user) {
            setUser(props.userInfo)
        } else {
            setUser({})
        }
    }, [props.user])

    const handleRatingChange = (event) => {
        setRatingValue(event.target.value);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    return (
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
    )
}