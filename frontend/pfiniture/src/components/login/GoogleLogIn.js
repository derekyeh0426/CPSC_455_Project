import { Form, Button, Row, Col, Container, FormGroup, Image, Modal, ModalBody, Nav } from "react-bootstrap";
import React from 'react';
import GoogleLogin from 'react-google-login';
import logIn from '../../redux/users/userActions'
import { connect } from 'react-redux'
import client from '../../API/api'
import './LogInForm.css'

const Client_ID = "897654971286-rgivsn5mcj4cs54e7j3v0fq6cm9a3dov.apps.googleusercontent.com"

class GoogleLogIn extends React.Component {
    responseGoogle = (response) => {
        this.props.logIn(response.profileObj)
        const newUser = {
            name: response.profileObj.name,
            email: response.profileObj.email
        }
        client.user.addUsers(newUser).then(res => {
            console.log(res.data);
            client.user.getAllUsers().then(res => {
                console.log(res.data)
            })
        });
        console.log(response);
        console.log(response.profileObj);
        console.log(this.props.name);
    }

    render(){
        return(
            <div>
                <GoogleLogin className="google-login-button"
                clientId = {Client_ID}
                buttonText = "Log in with Google!"
                onSuccess = {this.responseGoogle}
                onFailure = {this.responseGoogle}
                cookiePolicy = {'single_host_origin'}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isLogIn: state.isLogIn, name: state.name, email: state.email
    }
}

const mapDispatchToProps = {
    logIn
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GoogleLogIn)