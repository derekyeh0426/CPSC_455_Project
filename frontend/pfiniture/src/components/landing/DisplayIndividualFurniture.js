import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import client from "../../API/api";
import {
    Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button,
    IconButton, Collapse, TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, Slider
} from '@material-ui/core'
import { updateToCart } from '../../helpers'
import SearchIcon from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ViewSellerProfile from "./ViewSellerProfile"
import { store } from '../../redux/store';
import './DisplayAllFurniture.css';
import { LOCATIONS, FURNITURE_TYPES } from '../../constants'
import UserAddCartItem from '../../redux/users/UserAddCartItem'
import UserRemoveCartItem from '../../redux/users/UserRemoveCartItem'

const useStyles = makeStyles((theme) => ({
    alignCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonMargin: {
        margin: 8
    },
    root: {
        flexGrow: 1,
    },
    cardRoot: {
        width: 400,
        maxHeight: 600
    },
    formControl: {
        minWidth: 130,
        marginRight: theme.spacing(1),
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
    const min = 0;
    const max = 1000;
    const classes = useStyles();
    const [buyerId, setBuyerId] = useState("");
    const [cartId, setCartId] = useState("");
    const [cartListings, setCartListings] = useState([]);
    const [expandedId, setExpandedId] = useState(-1);
    const [searchTerm, setSearchTerm] = useState("");
    const [typeTerm, setTypeTerm] = useState("all");
    const [listings, setListings] = useState([]);
    const [originalListings, setOriginalListings] = useState([]);
    const [priceRange, setPriceRange] = useState([min, max]);
    const [location, setLocation] = useState("all");

    useEffect(() => {
        setBuyerId(store.getState().id)
        client.listing.getAllListingsDescendingOrder().then(listings => {
            setListings(listings.data);
            setOriginalListings(listings.data);
            client.user.getUserById(store.getState().id).then(buyerInfo => {
                const cart = buyerInfo.data.cart;
                if (!cart) {
                    setCartListings([]);
                } else {
                    setCartId(cart.id)
                    setCartListings(cart.listings);
                }
            })
        })
    }, [store.getState().id]);

    const handleExpandClick = (index) => {
        setExpandedId(expandedId === index ? -1 : index);
    };

    const handleSearch = () => {
        const currentListing = listings;
        const filterListing = currentListing.filter((listing) => listing.furniture.price >= priceRange[0] && listing.furniture.price <= priceRange[1]).filter((listing) => {
            if (location === "all") {
                return listing;
            } else if (location === listing.user.location) {
                return listing;
            } else {
                return ""
            }
        }).filter((listing) => {
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

    const handleChange = (event, newpriceRange) => {
        setPriceRange(newpriceRange);
    };

    const resetSearch = () => {
        setListings(originalListings);
        setSearchTerm("");
        setTypeTerm("all");
        setLocation("all")
        setPriceRange([min, max]);
    }

    const onAddToCart = (listingId, buyerId) => {
        client.user.getUserById(buyerId).then((response) => {
            const cart = response.data.cart;
            if (!cart) {
                client.cart.addCartToUser({ user: buyerId, listing: listingId })
                props.UserAddCartItem()
            }
            else {
                let tempListings = JSON.parse(JSON.stringify(cart.listings));
                if (!tempListings.includes(listingId)) {
                    tempListings.push(listingId)
                    client.cart.updateCartById({ listing: tempListings, id: cart.id })
                    props.UserAddCartItem()
                }
            }
                
        })
    }

    return (
        <div>
            <div className={classes.alignCenter}>
                <div>
                    <TextField
                        className={classes.searchMargin}
                        placeholder="Search..."
                        id="input-with-icon-textfield"
                        onChange={(event) => { setSearchTerm(event.target.value) }}
                        value={searchTerm}
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
                            {FURNITURE_TYPES.map((type) => {
                                return <MenuItem
                                    key={type}
                                    value={type}
                                    default=''>
                                    {type}
                                </MenuItem>
                            })}
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel id="select-location-filter">Select Location</InputLabel>
                        <Select
                            labelId="select-location-label"
                            id="select-location"
                            value={location}
                            onChange={(event) => { setLocation(event.target.value) }}
                            displayEmpty
                            className={classes.selectEmpty}
                        >
                            <MenuItem value="all">
                                <em>All</em>
                            </MenuItem>
                            {LOCATIONS.map((location) => {
                                return <MenuItem
                                    key={location}
                                    value={location}
                                    default=''>
                                    {location}
                                </MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </div>

                <div>
                    <Button color="primary" className={classes.buttonMargin} onClick={handleSearch}>Search</Button>
                    <Button color="primary" onClick={resetSearch}>Clear Filters</Button>
                </div>
            </div>
            <div className={classes.root}>
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
            <div className={classes.listingsSection}>
                {listings.length === 0
                    ?
                    <div>
                        <p>No Matched Results</p>
                        <p>Clear the filter to search again</p>
                    </div>
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
                                        {props.isLogIn
                                            ?
                                            <div>
                                                {!cartListings
                                                    ?
                                                    <Button size="small" color="primary"
                                                        onClick={() => onAddToCart(listing.id, buyerId)}>
                                                        Add to Cart
                                                    </Button>
                                                    :
                                                    <div>
                                                        {cartListings.includes(listing.id)
                                                            ? <Button
                                                                size="small"
                                                                color="secondary"
                                                                onClick={() => {
                                                                    props.UserRemoveCartItem(); updateToCart(listing.id, cartListings, cartId, "landing")}}
                                                            > Remove From Cart
                                                            </Button>
                                                            :
                                                            <Button
                                                                size="small" color="primary"
                                                                onClick={() => onAddToCart(listing.id, buyerId)}>
                                                                Add to Cart
                                                            </Button>
                                                        }
                                                    </div>
                                                }
                                            </div>
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

function mapStateToProps(state) {
    return {
        isLogIn: state.isLogIn, name: state.name, email: state.email, id: state.id, cartQuantity: state.cartQuantity
    }
}

const mapDispatchToProps = {
    UserAddCartItem,
    UserRemoveCartItem
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DisplayIndividualFurniture)