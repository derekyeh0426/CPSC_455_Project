import React, { useEffect, useState } from 'react';
import client from '../../API/api'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { store } from '../../redux/store';
import {Grid,Card,Typography,CardActions,Button,CardActionArea,CardMedia,} from '@material-ui/core'
import AddListingForm from './AddListingForm';

const useStyles = makeStyles((theme) => ({
    alignCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    root: {
        flexGrow: 1,
    },
    cardRoot: {
        width: 400,
        maxHeight: 600
    },
    listingInfo: {
        marginRight: 10,
        marginLeft: 10
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

function DisplayMyListings() {
    const classes = useStyles()
    const [listings, setListings] = useState([]);
    const [userId, setUserId] = useState(store.getState().id);

    useEffect(() => {
        setUserId(store.getState().id)
        client.listing.getListingByUserId(userId).then(listings => {
            setListings(listings.data.reverse());
        })
    }, [store.getState().id])

    const handleDelete = (e, id) => {
        e.preventDefault();
        client.listing.deleteListingById(id).then(() => {
            client.listing.getListingByUserId(userId).then(listings => {
                setListings(listings.data.reverse());
            })
        })
    }

    return (
        <div className="grid-container">
            <AddListingForm setListings={setListings}/>
                <Grid
                    className={classes.alignCenter}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                    {listings.length === 0
                        ? ""
                        : listings.map((listing, index) => (
                            <div key={index} className="furniture-spacing">
                                <Card className={classes.cardRoot}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={listing.images[0] ? listing.images[0].imageUrl : ""}
                                            title={listing.furniture.name}
                                        />
                                    </CardActionArea>
                                    <div className={classes.listingInfo}>
                                    <Typography gutterBottom variant="h6" component="h2">
                                            ${listing.furniture.price} • {listing.furniture.name}
                                        </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    Type: {listing.type}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    Description: {listing.description}
                                                </Typography>
                                                </div>
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
        </div>
    )
}

function mapStateToProps(state) {
    return {
        isLogIn: state.isLogIn, name: state.name, email: state.email, id: state.id
    }
}

export default connect(
    mapStateToProps,
)(DisplayMyListings)