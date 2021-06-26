import { Form, Button, Row, Col, Container, FormGroup, Image, Modal, ModalBody, Nav } from "react-bootstrap";
import React from 'react';
import "./LogInForm.css"
import { connect } from 'react-redux'
import logIn from '../../redux/users/userActions'

class LogInForm extends React.Component {
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
                    Log In
                </Button>
                <Modal size="lg" show={this.state.show} scrollable={true} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Log In</Modal.Title>
                    </Modal.Header>
                    <ModalBody className = "myform">
                        <div class="text_art">
                            <div class="text_rotate">
                                <h5>{this.props.name} {this.props.email}</h5>
                                <h5 id="card_header">Fresh Furniture</h5>
                            </div>
                        </div>
                        <Form className="login-form">
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="2">
                                    Email
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="email" placeholder="email" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="2">
                                    Password
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control type="password" placeholder="Password" />
                                </Col>
                            </Form.Group>
                            <span className = "log-in-line">
                                <Nav className="justify-content-center" activeKey="/home">
                                    <text>Haven't sign up yet?</text>
                                    <Nav.Item className = "reference">
                                        <Nav.Link href="/home/">Sign up</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </span>
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

function mapStateToProps(state) {
    return {
        isLogIn: state.isLogIn, name: state.name, email: state.email
    }
}

function mapDispatchToProps (dispatch) {
    return {
        logIn: () => dispatch(logIn())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogInForm)