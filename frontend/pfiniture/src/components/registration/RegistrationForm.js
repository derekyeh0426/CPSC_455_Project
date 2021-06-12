import { Form, Button, Row, Col, Container, FormGroup, Image, Modal, ModalBody } from "react-bootstrap";
import React from 'react';
import "./RegistrationForm.css"

class RegistrationForm extends React.Component {
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
                    Sign Up!
                </Button>
                <Modal size="lg" show={this.state.show} scrollable={true} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Registration</Modal.Title>
                    </Modal.Header>
                    <ModalBody className = "sign-up-form">
                        <div class="text_art">
                            <div class="text_rotate">
                                <h5 id="card_header">Fresh Furniture</h5>
                            </div>
                        </div>
                        <Form >
                            <Row>
                                <Col>
                                    <Form.Group as={Row} controlId="formFirstName">
                                        <Form.Label column sm="4">
                                            First Name:
                                    </Form.Label>
                                        <Col sm="5">
                                            <Form.Control type="name" placeholder="First Name" />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formDateOfBirth">
                                        <Form.Label column sm="4">
                                            Date Of Birth:
                                    </Form.Label>
                                        <Col sm="5">
                                            <Form.Control type="date" />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="3">
                                            Email:
                                    </Form.Label>
                                        <Col sm="8">
                                            <Form.Control type="email" placeholder="email" />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextEmail">
                                        <Form.Label column sm="3">
                                                
                                    </Form.Label>
                                        <Col sm="8">
                                            <Form.Control type="email" placeholder="Confirm email" />
                                        </Col>
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group as={Row} controlId="formLastName">
                                        <Form.Label column sm="4">
                                            Last Name:
                                    </Form.Label>
                                        <Col sm="5">
                                            <Form.Control type="name" placeholder="Last Name" />
                                        </Col>
                                    </Form.Group>

                                    <div id="select-sex">

                                        {['checkbox'].map((type) => (
                                            <div key={`custom-inline-${type}`} className="mb-3">
                                                <text id = "sex-label">Sex:</text>
                                                <Form.Check
                                                    custom
                                                    inline
                                                    label="Male"
                                                    type={type}
                                                    id={`custom-inline-${type}-1`}
                                                />
                                                <Form.Check
                                                    custom
                                                    inline
                                                    label="Female"
                                                    type={type}
                                                    id={`custom-inline-${type}-2`}
                                                />
                                                <Form.Check
                                                    custom
                                                    inline
                                                    label="Other"
                                                    type={type}
                                                    id={`custom-inline-${type}-3`}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <Form.Group as={Row} controlId="formPlaintextPassword">
                                        <Form.Label column sm="4">
                                            Password
                                    </Form.Label>
                                        <Col sm="7">
                                            <Form.Control type="password" placeholder="Password" />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formPlaintextPassword">
                                        <Form.Label column sm="4">
                                                    
                                    </Form.Label>
                                        <Col sm="7">
                                            <Form.Control type="password" placeholder="Confirm Password" />
                                        </Col>
                                    </Form.Group>
                                </Col>
                            </Row>


                        </Form>
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

export default RegistrationForm;