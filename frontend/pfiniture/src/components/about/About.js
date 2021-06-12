import { Form, Button, Row, Col, Container, FormGroup, Image, Modal, ModalBody, Nav } from "react-bootstrap";
import React from 'react';
import "./About.css"
import image from '../../assets/FF_12.png';

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    handleShow = () => {
        this.setState({ show: true })
    }

    handleClose = () => {
        this.setState({ show: false })
    }

    render() {
        return (
            <div>
                <Button variant="light" className="button-modal" onClick={this.handleShow}>
                    About
                </Button>
                <Modal size="lg" show={this.state.show} scrollable={true} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>About this web app</Modal.Title>
                    </Modal.Header>
                    <ModalBody className="myform">
                        <div class="text_art">
                            <span>
                            <img src = {image} className = "about-image"></img>
                            <div class="text_rotate">
                                <h5 id="card_header">Fresh Furniture</h5>
                            </div>
                            </span>
                        </div>
                        <br/>
                        <h6>
                            Fresh Furniture is a web application that aims to facilitate furniture trading on the market. It will support selling, buying, and even loaning second-hand or newly made furniture. Users have the option of opening their own store to sell their pre-owned furniture or service to build customized or fix furniture. Otherwise, users can just shop or order a service. Our app will aid in reducing waste and provide affordable furniture.
                        </h6>
                    </ModalBody>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default About;