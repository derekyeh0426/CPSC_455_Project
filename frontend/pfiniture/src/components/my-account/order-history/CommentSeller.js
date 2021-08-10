import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    TextField,
} from '@material-ui/core';
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
    const [user, setUser] = React.useState(props.user);
    const [comment, setComment] = React.useState('');

    useEffect(() => {
        if (user) {
            setUser(props.userInfo)
        } else {
            setUser({})
        }
    }, [props.userInfo])

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    return (
        <div className={classes.comment}>
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
    )
}