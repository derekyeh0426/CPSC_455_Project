import {Form, Button, Row, Col, Container, Modal, ModalBody, ModalFooter} from "react-bootstrap";
import React from 'react';
import "./RegistrationForm.css"
import LogInForm from "../login/LogInForm";
import client from "../../API/api";

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false, firstName: "", lastName: "", dob: "", sex: "F", email: "", confirmEmail: "",
            password: "", confirmPassword: ""
        }
    }

    register = () => {
        const firstName = this.state.firstName
        const lastName = this.state.lastName
        const dob = this.state.dob
        const sex = this.state.sex
        const email = this.state.email.toLowerCase()
        const confirmEmail = this.state.confirmEmail.toLowerCase()
        const password = this.state.password
        const confirmPassword = this.state.confirmPassword
        let registrationInfo = [firstName, lastName, dob, sex, email, confirmEmail, password, confirmPassword]
        if (registrationInfo.includes("")) {
            alert("Please fill out all * (required) items")
        } else if ( email === confirmEmail || password === confirmPassword) {
            alert("Emails and/or passwords are not matching")
        } else {
            // TODO fix api call
            client.user.addUsers({firstName, email}).then(res => {
                console.log(res.data)
                this.handleClose()
            })
        }
    }

    setFirstName = (e) => {
        this.setState({firstName: e.target.value})
    }

    setLastName = (e) => {
        this.setState({lastName: e.target.value})
    }

    setDob = (e) => {
        this.setState({dob: e.target.value})
    }

    setSex = (e) => {
        this.setState({sex: e.target.value})
    }

    setEmail = (e) => {
        this.setState({email: e.target.value})
    }

    setConfirmEmail = (e) => {
        this.setState({confirmEmail: e.target.value})
    }

    setPassword = (e) => {
        this.setState({password: e.target.value})
    }

    setConfirmPassword = (e) => {
        this.setState({confirmPassword: e.target.value})
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
                <Button variant="outline-dark" className="login-reg-button" onClick={this.handleShow}>
                    Register
                </Button>
                <Modal size="lg" show={this.state.show} scrollable={true} onHide={this.handleClose}>
                    <Modal.Header closeButton/>
                    <ModalBody>
                        <Container className="center-component">
                            <text className="card_header">Fresh Furniture Registration</text>
                        </Container>
                        <br/>
                        <br/>
                        <Form >
                            <Row>
                                <Col>
                                    <Form.Group as={Row} controlId="formFirstName">
                                        <Form.Label column sm="4">
                                            First Name*
                                        </Form.Label>
                                        <Col sm="5">
                                            <Form.Control
                                                type="name"
                                                onChange={this.setFirstName}
                                                placeholder="First Name" />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formDateOfBirth">
                                        <Form.Label column sm="4">
                                            Date Of Birth*
                                        </Form.Label>
                                        <Col sm="5">
                                            <Form.Control type="date" onChange={this.setDob} />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formEmail">
                                        <Form.Label column sm="3">
                                            Email*
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control
                                                type="email"
                                                onChange={this.setEmail}
                                                placeholder="Email" />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formConfirmEmail">
                                        <Form.Label column sm="3">

                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control
                                                type="email"
                                                onChange={this.setConfirmEmail}
                                                placeholder="Confirm email" />
                                        </Col>
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group as={Row} controlId="formLastName">
                                        <Form.Label column sm="4">
                                            Last Name*
                                        </Form.Label>
                                        <Col sm="5">
                                            <Form.Control
                                                type="name"
                                                onChange={this.setLastName}
                                                placeholder="Last Name" />
                                        </Col>
                                    </Form.Group>

                                    {/*TODO save when onChange*/}
                                    <div id="select-sex">
                                        {['checkbox'].map((type) => (
                                            <div key={`custom-inline-${type}`} className="mb-3">
                                                <text id = "sex-label">Sex*</text>
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

                                    <Form.Group as={Row} controlId="formPassword">
                                        <Form.Label column sm="4">
                                            Password*
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control
                                                type="password"
                                                onChange={this.setPassword}
                                                placeholder="Password" />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} controlId="formConfirmPassword">
                                        <Form.Label column sm="4">
                                        </Form.Label>
                                        <Col sm="7">
                                            <Form.Control
                                                type="password"
                                                onChange={this.setConfirmPassword}
                                                placeholder="Confirm Password" />
                                        </Col>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                        <Container className="center-component">
                            <Button variant="outline-dark" className="login-reg-button" onClick={this.register}>
                                Register with FF
                            </Button>
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <text>Already registered?</text>
                        <LogInForm />
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default RegistrationForm;