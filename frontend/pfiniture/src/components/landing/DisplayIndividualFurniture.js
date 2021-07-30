import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    IconButton,
    Collapse,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ViewSellerProfile from "./ViewSellerProfile"

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
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    }
}));

function DisplayIndividualFurniture(props) {
    let listings = Array.from(props.allListings);
    const classes = useStyles()
    const [expandedId, setExpandedId] = React.useState(-1);

    const handleExpandClick = (index) => {
        setExpandedId(expandedId === index ? -1 : index);
    }

    const getListings = (listing) => {
        console.log(listings)
        console.log(listing)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            {listings.length === 0 
                ? "Listings are currently unavailable"
                :
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                    {listings.map((listing, index) => (
                        <div key={index} className="furniture-spacing">
                            <Card key={index} className={classes.cardRoot}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        // image={listing.images[0]}
                                        title={listing.furniture.name}
                                    />
                                </CardActionArea>
                                <Typography gutterBottom variant="h6" component="h2">
                                    ${listing.furniture.price} • {listing.furniture.name}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="h2">
                                </Typography>
                                <Collapse in={expandedId === index} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Seller: {listing.user.name} ({listing.user.rating})
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Type:
                                            {/* {listing.type} */}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Description: {listing.description}
                                        </Typography>
                                    </CardContent>
                                </Collapse>
                                <IconButton
                                    onClick={() => {handleExpandClick(index)}}
                                        aria-expanded={expandedId === index}
                                    aria-label="show more">
                                    <ExpandMoreIcon />
                                </IconButton>
                                <CardActions>
                                    <ViewSellerProfile />
                                    <Button size="small" color="primary">
                                        Add to Cart
                                    </Button>
                                    <Button onClick={() => getListings(listing)}>Get PropsListings</Button>
                                </CardActions>
                            </Card>
                        </div>
                    ))}
                </Grid>
            }
        </div>
    )
}

export default DisplayIndividualFurniture