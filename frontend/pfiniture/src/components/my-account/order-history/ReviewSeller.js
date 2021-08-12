import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import RateSeller from "./RateSeller"
import CommentSeller from "./CommentSeller"

const useStyles = makeStyles((theme) => ({
    alignCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}))

export default function ReviewSeller(props) {
    const classes = useStyles();
    const [user, setUser] = useState(props.userInfo);

    useEffect(() => {
        if (user) {
            setUser(props.userInfo)
            console.log(props.userInfo)
            // client.user.getUserById(props.userInfo.id).then
        } else {
            setUser({})
        }
    }, [props.userInfo])

    return (
        <div>
            <p className={classes.alignCenter}>Since you bought furniture from {!user ? "this seller" : user.name}...</p>
            <div className={classes.alignCenter}>
                <RateSeller userInfo={user} />
                <CommentSeller userInfo={user} />
            </div>
        </div>
    )
}