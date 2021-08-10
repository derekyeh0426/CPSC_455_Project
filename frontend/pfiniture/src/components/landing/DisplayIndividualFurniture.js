import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import client from "../../API/api";
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
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Slider
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
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
    formControl: {
        minWidth: 120,
    },
    listingsSection: {
        height: '68vh',
        overflowY: 'auto',
        border: 0,
        borderRadius: 1,
    },
    searchMargin: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    selectEmpty: {
        marginTop: theme.spacing(1),
    },
    sliderRoot: {
        flexGrow: 1,
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
    let temFurnitureType = ["chair", "desk", "table"];
    const min = 0;
    const max = 1000
    const classes = useStyles();
    const [expandedId, setExpandedId] = React.useState(-1);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [typeTerm, setTypeTerm] = React.useState("all");
    const [listings, setListings] = React.useState([]);
    const [originalListings, setOriginalListings] = React.useState([]);
    const [priceRange, setpriceRange] = React.useState([min, max]);

    React.useEffect(() => {
        client.listing.getAllListings().then(listings => {
            setListings(listings.data);
            setOriginalListings(listings.data);
        })
    }, []);

    const handleExpandClick = (index) => {
        setExpandedId(expandedId === index ? -1 : index);
    };

    const handleSearch = () => {
        const currentListing = listings;
        const filterListing = currentListing.filter((listing) => listing.furniture.price >= priceRange[0] && listing.furniture.price <= priceRange[1]).filter((listing) => {
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
        })
        setListings(filterListing);
    }

    function priceRangeText(priceRange) {
        return `$${priceRange}`;
    }

    const handleChange = (newpriceRange) => {
        setpriceRange(newpriceRange);
    };

    const resetSearch = () => {
        setListings(originalListings);
        setSearchTerm("");
        setTypeTerm("all");
        setpriceRange([min, max]);
    }

    return (
        <div>
            <div>
                <TextField
                    className={classes.searchMargin}
                    placeholder="Search..."
                    id="input-with-icon-textfield"
                    onChange={(event) => { setSearchTerm(event.target.value) }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Furniture Type</InputLabel>
                    <Select
                        labelId="select-furniture-type-label"
                        id="select-furniture-type"
                        value={typeTerm}
                        onChange={(event) => { setTypeTerm(event.target.value) }}
                        displayEmpty
                        className={classes.selectEmpty}
                    >
                        <MenuItem value="all">
                            <em>All</em>
                        </MenuItem>
                        {temFurnitureType.map((type) => {
                            return <MenuItem
                                key={type}
                                value={type}
                                default=''>
                                {type}
                            </MenuItem>
                        })}
                    </Select>
                </FormControl>
                <div className={classes.sliderRoot}>
                    <Typography id="range-slider" gutterBottom>
                        Price Range • ${priceRange[0]} - ${priceRange[1]}
                    </Typography>
                    <Slider
                        value={priceRange}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        getAriaValueText={priceRangeText}
                        step={100}
                        marks
                        min={min}
                        max={max}
                    />
                </div>
                <Button onClick={handleSearch}>Search</Button>
                <Button onClick={resetSearch}>Clear Filters</Button>
            </div>
            <div className={classes.listingsSection}>
                {listings.length === 0
                    ? <p>No Matched Results</p>
                    :
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center">
                        {
                            listings.map((listing, index) => (
                                <div key={index} className="furniture-spacing">
                                    <Card key={index} className={classes.cardRoot}>
                                        <CardActionArea>
                                            <CardMedia
                                                className={classes.media}
                                                image={listing.images[0] ? listing.images[0].imageUrl : ""}
                                                title={listing.furniture.name}
                                            />
                                        </CardActionArea>
                                        <Typography gutterBottom variant="h6" component="h2">
                                            ${listing.furniture.price} • {listing.furniture.name}
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
                                            {props.isLogIn ?
                                                <Button size="small" color="primary" onClick={() => onAddToCart(listing.id)}>
                                                    Add to Cart
                                                </Button>
                                                : ""
                                            }
                                        </CardActions>
                                    </Card>
                                </div>
                            ))}
                    </Grid>
                }
            </div>
        </div>
    )
}

function onAddToCart(listingID) {
    const userID = "6104918f9a92da1084fb7438";
    client.user.getUserById(userID).then((response) => {
        const cart = response.data.cart;
        if (!cart) {
            client.cart.addCartToUser({ user: userID, listing: listingID }).then((response) => console.log(response));
        }
        else {
            console.log("user already has cart");
            client.cart.updateCartById({ user: userID, listing: listingID, id: cart.id }).then((response) => {
                console.log(response)
            });
        }
    })
}

function mapStateToProps(state) {
    return {
        isLogIn: state.isLogIn, name: state.name, email: state.email, id: state.id
    }
}

export default connect(
    mapStateToProps,
)(DisplayIndividualFurniture)