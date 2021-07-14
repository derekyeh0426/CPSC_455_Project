import { Form, Button, Row, Col, Container, FormGroup, Image, Modal, ModalBody, Nav } from "react-bootstrap";
import React from 'react';
import "./LogInForm.css"
import { connect } from 'react-redux'
import logIn from '../../redux/users/userActions'
import GoogleLogIn from "./GoogleLogIn";
import RegistrationForm from "../registration/RegistrationForm";
import client from "../../API/api";

class LogInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false, email: "", password: ""
        }
    }

    setEmail = (e) => {
        this.setState( {email: e.target.value})
    }

    setPassword = (e) => {
        this.setState( {password: e.target.value})
    }

    handleShow = () => {
        this.setState({ show: true })
    }

    handleSubmit = () => {
        let email = this.state.email
        let password = this.state.password
        if (email === "" || password === "") {
            alert("Please fill out your email/password")
        }
        // TODO check if password or email is incorrect
        else {
            alert("Logged in!")
            this.handleClose()
        }
    }

    handleClose = () => {
        this.setState({ show: false })
    }

    render() {
        return (
            <div>
                <Button variant="outline-dark" className="login-reg-button" onClick={this.handleShow}>
                    Login
                </Button>
                <Modal size="lg" show={this.state.show} scrollable={true} onHide={this.handleClose}>
                    <Modal.Header closeButton/>
                    <ModalBody className="login-modal">
                        <Container className="center-component">
                            <text className="card_header">Fresh Furniture Login</text>
                        </Container>
                        <Container className="center-component">
                            <GoogleLogIn/>
                        </Container>
                        <br/>
                        <br/>
                        <Form className="login-form">
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="2">
                                    Email
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="email"
                                        onChange={this.setEmail}
                                        placeholder="Email" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="2">
                                    Password
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="password"
                                        onChange={this.setPassword}
                                        placeholder="Password" />
                                </Col>
                            </Form.Group>
                            <Container className="center-component">
                                <Button variant="outline-dark" className="login-reg-button" onClick={this.handleSubmit}>
                                    Login with FF
                                </Button>
                            </Container>
                        </Form>
                    </ModalBody>
                    <Modal.Footer>
                        <text>Haven't registered yet?</text>
                        <RegistrationForm/>
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