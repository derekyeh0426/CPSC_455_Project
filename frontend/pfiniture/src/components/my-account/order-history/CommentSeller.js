import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button,TextField,} from '@material-ui/core';
import { store } from '../../../redux/store';
import client from "../../../API/api";

const useStyles = makeStyles((theme) => ({
    alignCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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

export default function CommentSeller(props) {
    const classes = useStyles();
    const [sellerInfo, setSellerInfo] = useState(props.userInfo);
    const [comment, setComment] = useState('');
    const [buyerId, setBuyerId] = useState(store.getState().id)
    const [alreadyCommented, setAlreadyCommented] = useState(false)

    useEffect(() => {
        if (sellerInfo) {
            setSellerInfo(props.userInfo);
            setBuyerId(store.getState().id);
            client.user.getUserById(buyerId).then(buyerInfo => {
                let commentedUsers = buyerInfo.data.commentedUsers
                if (commentedUsers.length) {
                    commentedUsers.forEach(comment => {
                        if (comment.user === sellerInfo.id) {
                            setComment(comment.comment);
                            setAlreadyCommented(true);
                        }
                    })
                }
            })
        } else {
            setSellerInfo({});
        }
    }, [props.userInfo, store.getState().id])

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmitComment = () => {
        let seller = sellerInfo.id;
        let buyer = buyerId;
        client.user.commentSeller({ seller, comment, buyer }).then(() =>
            setComment(comment)
        )
    }

    return (
        <div className={classes.comment}>
            <TextField
                id="comment-seller-textfield"
                label={alreadyCommented ? "Update your comment: " : "Leave a comment!"}
                multiline
                rows={3}
                value={comment}
                onChange={handleCommentChange}
                InputLabelProps={{ shrink: true }}
            />
            <Button onClick={handleSubmitComment}>
                {alreadyCommented ? "Update Comment" : "Submit Comment"}
            </Button>
        </div>
    )
}