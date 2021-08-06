import { Form, Button, Row, Col, Modal, ModalBody } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Paypal from "./Paypal";
import client from "../../API/api";

const CheckOut = () => {
    const [checkout, setCheckOut] = useState(false);
    const [show, setShow] = useState(false);
    const [shippingAddress, setShippingAddress] = useState("");
    const [listings, setListings] = useState([]);

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
            {checkout
                ? <Paypal />
                :
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
                
            }
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
                        <ul>
                            { listings.map((listing) => {
                                return <li> { listing.id } </li>
                            }) }
                        </ul>
                    }    
                </ModalBody>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={onPlaceOrder}>Place Order</Button>
                </Modal.Footer>
                <Paypal/>
            </Modal>
        </div>
    );

    function getListings() {
        
    }
}

function onPlaceOrder() {

}



export default CheckOut;