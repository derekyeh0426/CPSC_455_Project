import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
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
import { Form } from 'react-bootstrap'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ViewSellerProfile from "./ViewSellerProfile"
import './DisplayAllFurniture.css';

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

export default function DisplayIndividualFurniture(props) {
    let listings = Array.from(props.allListings);
    let temFurnitureType = ["all", "chair", "desk", "table"]
    const classes = useStyles()
    const [expandedId, setExpandedId] = React.useState(-1);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [typeTerm, setTypeTerm] = React.useState('');

    const handleExpandClick = (index) => {
        setExpandedId(expandedId === index ? -1 : index);
    }

    const displayImage = (listing) => {
        if (listing.images.length === 0) {
            return ""
        } else {
            return listing.images[0].imageUrl
        }
    }

    return (
        <div>
            <span>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    onChange={(event) => { setSearchTerm(event.target.value) }}></input>
                <Form.Control
                    onChange={(event) => { setTypeTerm(event.target.value) }}
                    defaultValue="Filter by Furniture Type"
                    as="select"
                    single>
                    <option
                        value="Filter by Furniture Type"
                        disabled
                    >Filter by Furniture Type</option>
                    {temFurnitureType.map((type) => {
                        return <option
                            key={type}
                            value={type}
                            data-key={type}
                            default=''>
                            {type}
                        </option>
                    })}
                </Form.Control>
            </span>
            {listings.length === 0
                ? "Listings are currently unavailable"
                :
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                    {listings.filter((listing) => {
                        if (typeTerm === "" || typeTerm === "all") {
                            if (searchTerm === "") {
                                return listing;
                            } else if (listing.furniture.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                return listing;
                            } else {
                                return ""
                            }
                        } else if (typeTerm === listing.type) {
                            if (searchTerm === "") {
                                return listing;
                            } else if (listing.furniture.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                return listing;
                            } else {
                                return ""
                            }
                        } else {
                            return ""
                        }
                    }).map((listing, index) => (
                        <div key={index} className="furniture-spacing">
                            <Card key={index} className={classes.cardRoot}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={displayImage(listing)}
                                        // title={listing.furniture.name}
                                    />
                                    {console.log("hi")}
                                    {console.log(typeof listing)}
                                </CardActionArea>
                                <Typography gutterBottom variant="h6" component="h2">
                                    {/* ${listing.furniture.price}  */}
                                    {/* • {listing.furniture.name} */}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="h2">
                                </Typography>
                                <Collapse in={expandedId === index} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Seller: {listing.user.name} ({listing.user.rating})
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Type: {listing.type}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Description: {listing.description}
                                        </Typography>
                                    </CardContent>
                                </Collapse>
                                <IconButton
                                    onClick={() => { handleExpandClick(index) }}
                                    aria-expanded={expandedId === index}
                                    aria-label="show more">
                                    <ExpandMoreIcon />
                                </IconButton>
                                <CardActions>
                                    <ViewSellerProfile userInfo={listing.user} />
                                    <Button size="small" color="primary">
                                        Add to Cart
                                    </Button>
                                </CardActions>
                            </Card>
                        </div>
                    ))}
                </Grid>
            }
        </div>
    )
}


// function mapStateToProps(state) {
//     return {
//         isLogIn: state.isLogIn, name: state.name, email: state.email, id: state.id
//     }
// }

// export default connect(
//     mapStateToProps,
// )(DisplayIndividualFurniture)