import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Typography,
    Paper,
} from '@material-ui/core';
import client from "../../API/api";

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
    const [ratings, setRatings] = React.useState([]);
    const [comments, setComments] = React.useState(props.comments);
    const [user, setUser] = React.useState(props.userInfo);

    useEffect(() => {
        if (user) {
            setUser(props.userInfo);
            setRatings(props.ratings)
            setComments(props.comments);
        } else {
            setUser({})
            setRatings([])
            setComments([])
        }
    }, [props.userInfo, props.ratings, props.comments])

    return (
        <div>
            {!ratings
                ? <p>No Reviews</p>
                :
                ratings.map((rating, index) => {
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
                                                Buyer's Name
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                {rating.rating}
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
                    )
                })
            }
        </div>
    )
}