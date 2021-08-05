import React, { useEffect, useState } from 'react';
import client from '../../API/api'
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Card,
    Typography,
    CardActions,
    Button,
    Container
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    cardRoot: {
        width: 400,
        maxHeight: 600
    },
    media: {
        height: 300,
    },
    cardButtons: {
        justifyContent: 'center'
    },
    addFurnitureButton: {
        float: 'left',
        margin: 5
    }
}));

export default function DisplayMyListings() {
    const classes = useStyles()
    const [listings, setListings] = useState('');

    useEffect(() => {
        client.listing.getAllListings().then(listings => {
            setListings(listings.data);
        })
    }, [])

    const handleDelete = (e, id) => {
        e.preventDefault();
        client.listing.deleteListingById(id).then(() => {
            client.listing.getAllListings().then(listings => {
                setListings(listings.data);
            })
        })
    }

    return (
        <div className="grid-container">
            <Container>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                    {listings.length === 0
                        ? ""
                        : listings.map((listing, index) => (
                            <div key={index} className="furniture-spacing">
                                <Card className={classes.cardRoot}>
                                    {/* <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={furniture.picture}
                                            title={furniture.name}
                                        />
                                    </CardActionArea> */}
                                    <Typography gutterBottom variant="h6" component="h2">
                                        {/* ${listing.furniture.price}  */}
                                        {/* • {listing.furniture.name} */}
                                    </Typography>
                                    <CardActions className={classes.cardButtons}>
                                        <Button size="small" color="primary">
                                            Edit
                                        </Button>
                                        <Button
                                            size="small"
                                            color="secondary"
                                            onClick={(e) => { handleDelete(e, listing.id) }}>
                                            Delete
                                        </Button>
                                    </CardActions>
                                </Card>
                            </div>
                        ))
                    }
                </Grid>
            </Container>
        </div>
    )
}