import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RATINGS } from "../../../constants"
import {
    Button,
    Radio,
} from '@material-ui/core';
import client from "../../../API/api";

const useStyles = makeStyles((theme) => ({
    alignCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
    }
}))

export default function RateSeller(props) {
    const classes = useStyles();
    const [user, setUser] = React.useState(props.user);
    const [ratingValue, setRatingValue] = React.useState(0);

    useEffect(() => {
        if (user) {
            setUser(props.userInfo)
        } else {
            setUser({})
        }
    }, [props.userInfo])

    const handleRatingChange = (event) => {
        setRatingValue(event.target.value);
    };

    return (
        <div>
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
        </div>
    )
}