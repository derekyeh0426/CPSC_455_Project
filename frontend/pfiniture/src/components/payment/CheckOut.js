import { Form, Button, Row, Col, Modal, ModalBody } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Paypal from "./Paypal";
import client from "../../API/api";

const CheckOut = () => {
    const [checkout, setCheckOut] = useState(false);
    const [show, setShow] = useState(false);
    const [shippingAddress, setShippingAddress] = useState("");
    const [listings, setListings] = useState([]);

    var totalAmount;

    useEffect(() => {
        const userID = "6104918f9a92da1084fb7438";
        client.user.getUserById(userID).then(response => {
            if (response.status === 200) {
                const cart = response.data.cart;
                if (cart != null) {
                    Promise.all(
                            cart.listings.map((listing) => 
                            client.listing.getListingById(listing))
                            ).then((listings) => setListings(listings.map(({data}) => {
                                return data;
                            })))
                }
            }
        })
    }, [])
    console.log(listings);
    return (
        <div className="checkout">

                <Button
                    style={{margin: 5}}
                    variant="outline-dark"
                    onClick={() => { 
                        setCheckOut(true);
                        setShow(true);
                    }}
                >
                    CheckOut
                </Button>
             <Modal size="lg" scrollable={true} show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>Checkout</Modal.Header>
                <ModalBody>
                    <Form>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">
                                Shipping address
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    onChange={(e) => setShippingAddress(e.target.value)}
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                    {
                        <div>
                            {/* <ul>
                                { listings.map((listing) => {
                                    return (
                                        <div>
                                            <p> { listing.title } </p>
                                            <img src={listing.images[0].imageUrl} width={200} height={200}/>
                                            <p> {listing.furniture.price} </p>
                                        </div>
                                    )
                                }) }
                            </ul> */}
                            <p> Order Total: {getCartTotal()}</p>
                        </div>
                    }    
                </ModalBody>
                <Paypal
                address = {shippingAddress} 
                total = {getCartTotal()}
                />
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={onPlaceOrder}>Place Order</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

    function getCartTotal() {
        totalAmount = listings.map((listing) => listing.furniture.price).reduce((a, b) => a + b, 0)
        return totalAmount;
    }

    function onPlaceOrder() {
        const userID = "6104918f9a92da1084fb7438";
        client.order.addToOrders({user: userID, totalAmount: totalAmount, paymentType: "Credit Card" , shippingAddress: shippingAddress,
        furnitures: listings.map((listing) => listing.furniture.id)}).then((response) => {
            console.log(response);
        })
    }
    
}




export default CheckOut;