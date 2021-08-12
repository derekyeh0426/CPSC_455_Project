import { Form, Button, Row, Col } from 'react-bootstrap';
import { TextField, Typography, Modal, Fade, Backdrop, FormControl, Select, MenuItem } from '@material-ui/core'
import React, { useState, useEffect } from 'react';
import Paypal from './Paypal';
import client from '../../API/api';
import UserCheckout from '../../redux/users/UserReducer'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { NotificationManager } from "react-notifications";
import { LOCATIONS, TIME_OUT } from '../../constants';

const useStyles = makeStyles((theme) => ({
    alignCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkoutButton: {
        textAlign: 'center',
        margin: '0 auto',
        display: 'block',
        borderColor: '#004aad',
        color: '#004aad'
    },
    formControl: {
        minWidth: '100%',
    },
    marginBottom: {
        marginBottom: 10,
    },
    marginTop: {
        marginTop: 10,
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '50%',
        height: '80%',
        overflowY: 'auto'
    },
}));

const CheckOut = (props) => {
    const classes = useStyles();
    const [checkout, setCheckOut] = useState(false);
    const [open, setOpen] = useState(false);
    const [listings, setListings] = useState([]);
    const [buyerId, setBuyerId] = useState(props.id);
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [cartId, setCartId] = useState("");

    useEffect(() => {
        setBuyerId(props.id)
        client.user.getUserById(props.id).then(response => {
            if (response.status === 200) {
                const cart = response.data.cart;
                if (cart != null) {
                    setCartId(cart.id)
                    Promise.all(
                        cart.listings.map((listing) =>
                            client.listing.getListingById(listing))
                    ).then((listings) => setListings(listings.map(({ data }) => {
                        return data;
                    })))
                }
            }
        })
    }, [props.id])

    const handleOpen = () => {
        setCheckOut(true);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setAddress("")
        setCity("")
        setPostalCode("")
    };

    const onPlaceOrder = () => {
        let totalAmount = getTotal("total");
        console.log(address)
        let shippingAddress = {
            "address": address,
            "city": city,
            "province": "BC",
            "country": "Canada",
            "postalCode": postalCode
        };
        if (address === "" || city === "" || postalCode === "") {
            NotificationManager.error("Please fill out your shipping information!", "", TIME_OUT)
            return;
        } else {
            console.log(totalAmount)
            console.log(shippingAddress)
            console.log(buyerId)
            console.log(listings.map((listing) => listing.furniture.id))
            listings.forEach((listing) => {
                console.log(listing.user.id)
                console.log(listing.furniture.id)
                client.order.addToOrders({
                    seller: listing.user.id, buyer: buyerId, totalAmount: totalAmount, paymentType: "PayPal", shippingAddress: shippingAddress,
                    furnitures: listings.map((listing) => listing.furniture.id)
                    //TODO REMOVE CART LISTINGS FROM LISTINGS AND CART LISTINGS
                }).then((response) => {
                    console.log(response);
                    client.cart.updateCartById({listing: [], id: cartId})
                    props.UserCheckout();
                })
            })
        }
    }

    return (
        <div className="checkout">
            <Button
                style={{ margin: 5 }}
                variant="outline-dark"
                onClick={handleOpen}
            >
                CheckOut
            </Button>
            <Modal
                aria-labelledby="view-seller-profile"
                aria-describedby="profile-modal-description"
                className={classes.alignCenter}
                open={open}
                onClose={handleClose}
                scrollable
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <h4>Checkout Cart</h4>

                        <div className={classes.marginBottom}>
                            <Typography gutterBottom variant="h6" component="h2">Please enter your shipping address</Typography>
                            <Typography variant="body2" color="textSecondary">*We only ship within BC, Canada*</Typography>
                        </div>

                        <Form>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    Address
                                </Form.Label>
                                <Col sm="10">
                                    <TextField
                                        fullWidth
                                        size="small"
                                        id="outlined-basic"
                                        variant="outlined"
                                        onChange={(e) => setAddress(e.target.value)} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    City
                                </Form.Label>
                                <Col sm="10">
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <Select
                                            className={classes.selectForm}
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        >
                                            {LOCATIONS.map((city) => {
                                                return <MenuItem
                                                    key={city}
                                                    value={city}
                                                    default=''>
                                                    {city}
                                                </MenuItem>
                                            })}
                                        </Select>
                                    </FormControl>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row}>
                                <Form.Label column sm="2">
                                    Postal Code
                                </Form.Label>
                                <Col sm="10">
                                    <TextField
                                        fullWidth
                                        size="small"
                                        id="outlined-basic"
                                        variant="outlined"
                                        onChange={(e) => setPostalCode(e.target.value)} />
                                </Col>
                            </Form.Group>
                        </Form>

                        <div className={classes.marginTop}>
                            <Typography variant="body1">Sub Total: ${getTotal("subtotal")} </Typography>
                            <Typography variant="body2">GST: ${getTotal("gst")}</Typography>
                            <Typography variant="body2">PST: ${getTotal("pst")}</Typography>
                            <Typography variant="body2">Shipping (10%): ${getTotal("shipping")}</Typography>
                            <Typography gutterBottom variant="h6" component="h2">Order Total: ${getTotal("total")} </Typography>
                        </div>

                        <Paypal total={getTotal("total")} />

                        <Button
                            className={classes.checkoutButton}
                            variant="outline-dark"
                            onClick={onPlaceOrder}>Complete Order</Button>
                    </div>
                </Fade>
            </Modal>
        </div>
    );

    function getTotal(type) {
        let amount = listings.map((listing) => listing.furniture.price).reduce((a, b) => a + b, 0)
        const decimalPlace = 2;
        const gst = 0.05;
        const pst = 0.07;
        const shipping = 0.1;
        switch (type) {
            case "subtotal":
                return amount;
            case "gst":
                return (amount * gst).toFixed(decimalPlace);
            case "pst":
                return (amount * pst).toFixed(decimalPlace);
            case "shipping":
                return (amount * shipping).toFixed(decimalPlace);
            case "total":
                return (amount + (amount * (gst + pst + shipping))).toFixed(decimalPlace);
            default:
                return 0;
        }
    }
}

function mapStateToProps(state) {
    return {
        isLogIn: state.isLogIn, name: state.name, email: state.email, id: state.id, cartQuantity: state.cartQuantity
    }
}

const mapDispatchToProps = {
    UserCheckout
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckOut)