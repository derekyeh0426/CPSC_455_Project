import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RATINGS } from "../../../constants"
import {
    Button,
    Radio,
} from '@material-ui/core';
import { store } from '../../../redux/store';
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
    const [sellerInfo, setSellerInfo] = React.useState(props.userInfo);
    const [ratingValue, setRatingValue] = React.useState(0);
    const [buyerId, setBuyerId] = React.useState(store.getState().id)
    const [alreadyRated, setAlreadyRated] = React.useState(false)

    useEffect(() => {
        if (sellerInfo) {
            setSellerInfo(props.userInfo);
            setBuyerId(store.getState().id);
            client.user.getUserById(buyerId).then(buyerInfo => {
                let ratedUsers = buyerInfo.data.ratedUsers
                if (ratedUsers.length) {
                    ratedUsers.forEach(rating => {
                        if (rating.user.id === sellerInfo.id) {
                            setRatingValue(rating.rating.toString());
                            setAlreadyRated(true);
                        }
                    })
                }
            })
        } else {
            setSellerInfo({})
        }
    }, [props.userInfo])

    const handleRatingChange = (event) => {
        setRatingValue(event.target.value);
    };

    const handleSubmitRating = () => {
        let seller = sellerInfo.id;
        let buyer = buyerId;
        let rating = ratingValue;
        client.user.rateSeller({ seller, rating, buyer }).then(() =>
            setRatingValue(rating)
        );
    }

    return (
        <div>
            <div className={classes.rating}>
                <p id="rate-seller-p">
                    {alreadyRated ? "Update your rating!" : "Leave a rating!"}
                </p>
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
                <Button className={classes.alignCenter} onClick={handleSubmitRating}>
                    {alreadyRated ? "Update Rating" : "Submit Rating"}
                </Button>
            </div>
        </div>
    )
}