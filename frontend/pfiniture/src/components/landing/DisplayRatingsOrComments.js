import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid,Typography,Paper} from '@material-ui/core';

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

export default function DisplayRatingsOrComments(props) {
    const classes = useStyles();
    const [isComments, setIsComments] = useState(props.isComments)
    const [isRatings, setIsRatings] = useState(props.isRatings)
    const [ratingsOrComments, setRatingsOrComments] = useState(props.ratingsOrComments);

    useEffect(() => {
        setIsComments(props.isComments);
        setIsRatings(props.isRatings);
        setRatingsOrComments(props.ratingsOrComments);
    }, [props.isRatings, props.isComments, props.ratingsOrComments])

    return (
        <div>
            {!ratingsOrComments
                ? console.log(ratingsOrComments)
                : ratingsOrComments.map((ratingOrComment, index) => {
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
                                                    {isComments && isRatings
                                                        ? ratingOrComment.name
                                                        : ratingOrComment.user.name}
                                                </Typography>
                                                {isComments ?
                                                    <Typography variant="body2" gutterBottom>
                                                        {ratingOrComment.comment}
                                                    </Typography>
                                                    : ""}
                                                {isRatings
                                                    ? <Typography variant="body2" color="textSecondary">
                                                        Rating: {ratingOrComment.rating}
                                                    </Typography>
                                                    : ""
                                                }
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